# PetMatch Infrastructure

Infrastructure-as-Code for PetMatch's multi-account AWS organization using [Pulumi](https://www.pulumi.com/) (Python).

## Architecture Overview

```
                        ┌─────────────────────────────────────────────┐
                        │         Network Account (222222222222)      │
                        │                                             │
                        │   VPC: 10.0.0.0/16 (prod)                   │
                        │        10.1.0.0/16 (test)                   │
                        │                                             │
                        │   ┌─────────┐  ┌──────────┐  ┌──────────┐   │
                        │   │   NAT   │  │ Ingress  │  │ Private  │   │
                        │   │ Subnets │  │ Subnets  │  │ Subnets  │   │
                        │   └─────────┘  └──────────┘  └──────────┘   │
                        │                                             │
                        │   Shared via AWS RAM:                       │
                        │   ┌──────────────────┐   ┌───────────────┐  │
                        │   │ cache-service-   │   │ search-       │  │
                        │   │ private subnets  │   │ private       │  │
                        │   └────────┬─────────┘   │ subnets       │  │
                        │            │             └───────┬───────┘  │
                        │            │                     │          │
                        │   Shared Security Groups:        │          │
                        │   - internal-services            │          │
                        │   - cache-service-elasticache    │          │
                        │   - search-opensearch            │          │
                        └────────────┼─────────────────────┼──────────┘
                                     │ (RAM)               │ (RAM)
                    ┌────────────────┘                     └────────────────┐
                    ▼                                                       ▼
    ┌───────────────────────────────┐           ┌───────────────────────────────┐
    │  Cache Service Account        │           │  Search Account               │
    │  Test: 666666666666           │           │  Test: 444444444444           │
    │  Prod: 555555555555           │           │  Prod: 333333333333           │
    │                               │           │                               │
    │  Uses shared subnets to run:  │           │  Uses shared subnets to run:  │
    │  - ElastiCache (Redis)        │           │  - OpenSearch (TODO)          │
    │  - S3 Buckets                 │           │                               │
    └───────────────────────────────┘           └───────────────────────────────┘
                    ▲                                           ▲
                    │                                           │
                    │  Cross-account SG refs                    │
                    │  format: {account_id}/{sg_id}             │
                    │                                           │
    ┌───────────────────────────────┐                           │
    │  Management Account           │───────────────────────────┘
    │  111111111111                 │
    │                               │
    │  Legacy app containers that   │
    │  need access to cache/search  │
    └───────────────────────────────┘
```

## AWS Accounts

| Account | ID | Profile |
|---|---|---|
| Management | 111111111111 | management-iac |
| Network | 222222222222 | network-prod-iac |
| Search Prod | 333333333333 | search-prod-iac |
| Search Test | 444444444444 | search-test-iac |
| Cache Service Prod | 555555555555 | cache-service-prod-iac |
| Cache Service Test | 666666666666 | cache-service-test-iac |

## Repository Structure

```
infrastructure/
  orgs/orgs.json              # AWS account IDs and aliases (source of truth)
  package/                    # Shared Pulumi components (installed as pm_infra)
    components/
      full_vpc/               # VPC, subnets, NAT, IGW, RAM sharing
      elasticache/            # ElastiCache Redis component
      opensearch/             # OpenSearch component (TODO)
    project_exports.py        # Cross-stack export dataclasses
    utils/
      tags.py                 # Standard AWS tagging
      exports.py              # Base export classes (BaseExp, VpcExp, SecurityGroupExp)
    orgs/
      org_setup.py            # AWS org account management
  network/                    # Network account — hub VPC stack
  cache-service/              # Cache service account — ElastiCache + S3
  search/                     # Search service account — OpenSearch (TODO)
```

## Key Patterns

### Cross-Stack References

Service stacks import the network stack's VPC and shared resources:

```python
network_stack_ref = pulumi.StackReference(f"{org}/network/{network_config.stack_name}")
network_vpc_exp = FullVpcExp.from_network_stack_reference(network_stack_ref)
```

### Shared VPC Subnets

The network account creates subnets and shares them via AWS RAM. Service accounts
use these shared subnets without managing the VPC directly:

```python
subnet_ids = network_vpc_exp.groups["cache-service-private"].subnets.ids
```

### Cross-Account Security Groups

Security groups in the shared VPC are created by the network account and shared
via RAM. Additional cross-account references use the `{account_id}/{sg_id}` format:

```python
referenced_security_group_ids = [
    network_internal_exp.cache_service_elasticache_security_group_id,  # shared SG
    "111111111111/sg-0abc1234def56789a",  # management account SG
]
```

### Component Pattern

Reusable components follow this structure:
1. `Args` dataclass for configuration
2. `ComponentResource` subclass that creates AWS resources
3. `Exp(BaseExp)` dataclass with `from_resource()` for cross-stack exports

See `package/components/elasticache/elasticache.py` for a complete example.

### Configuration

Each stack has:
- `Pulumi.yaml` — project name and Python runtime config
- `Pulumi.{env}.{region}.yaml` — environment-specific AWS profile, region, and parameters
- `requirements.txt` — dependencies including `-e ..` for the shared package

### Stack Naming

Stacks are named `{project}/{env}.{region}`, e.g.:
- `network/test.eu-west-1`
- `cache-service/prod.eu-west-1`

## Validating Your Code

A local Pulumi backend is pre-configured with mock network stack outputs. You can
validate your code without AWS credentials:

ElastiCache example

```bash
cd infrastructure/cache-service
source venv/bin/activate
pulumi preview --stack organization/cache-service/test.eu-west-1
```

How to preview your new search service

```bash
cd infrastructure/search
source venv/bin/activate
pulumi preview --stack organization/search/test.eu-west-1
```

This resolves all Python code, cross-stack references, and shows the planned resource
graph. It catches import errors, missing config, type mismatches, and structural issues.

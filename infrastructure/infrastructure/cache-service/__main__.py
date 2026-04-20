"""Cache Service Infrastructure — ElastiCache + S3"""

from dataclasses import dataclass
from typing import Any

import pulumi
import pulumi_aws as aws
from pydantic import TypeAdapter

from pm_infra.components.elasticache import ElastiCache, ElastiCacheArgs, ElastiCacheExp
from pm_infra.components.full_vpc import FullVpcExp
from pm_infra.project_exports import CacheServiceExp, NetworkInternalExp
from pm_infra.utils.tags import get_aws_tags

tags = get_aws_tags()
pulumi_config = pulumi.Config()
stack_name = pulumi.get_stack()
org = pulumi.get_organization()


bucket_names = pulumi_config.require_object("bucket_names")


@dataclass
class NetworkConfig:
    stack_name: str


network_config: NetworkConfig = TypeAdapter(NetworkConfig).validate_python(pulumi_config.require_object("network"))
network_stack_ref = pulumi.StackReference(f"{org}/network/{network_config.stack_name}")
network_vpc_exp: FullVpcExp = FullVpcExp.from_network_stack_reference(network_stack_ref)
network_internal_exp: pulumi.Output[NetworkInternalExp] = network_stack_ref.get_output("network_internal").apply(
    lambda data: TypeAdapter(NetworkInternalExp).validate_python(data)
)


@dataclass
class ElastiCacheConfig:
    replication_group_id: str
    engine_version: str
    node_type: str
    num_cache_clusters: int
    auto_minor_version_upgrade: bool
    maintenance_window: str
    snapshot_window: str
    snapshot_retention_limit: int
    parameter_group_name: str | None = None
    parameter_group_family: str | None = None
    parameter_group_parameters: list[dict[str, str]] | None = None
    referenced_security_group_ids: list[str] | None = None


elasticache: ElastiCache | None = None
_elasticache_config_raw = pulumi_config.get_object("elasticache")
if _elasticache_config_raw is not None:
    elasticache_config = TypeAdapter(ElastiCacheConfig).validate_python(_elasticache_config_raw)
    elasticache_referenced_security_group_ids: list[Any] = [
        sg_id
        for sg_id in (
            # The shared security group to access ElastiCache from the same shared VPC
            [network_internal_exp.cache_service_elasticache_security_group_id]
            # Referenced security groups from other VPCs (e.g. management account containers)
            + (elasticache_config.referenced_security_group_ids or [])
        )
        if sg_id is not None
    ]
    elasticache = ElastiCache(
        "elasticache",
        args=ElastiCacheArgs(
            vpc_id=network_vpc_exp.vpc.id,
            subnet_ids=network_vpc_exp.groups["cache-service-private"].subnets.ids,
            replication_group_id=elasticache_config.replication_group_id,
            engine_version=elasticache_config.engine_version,
            node_type=elasticache_config.node_type,
            num_cache_clusters=elasticache_config.num_cache_clusters,
            parameter_group_name=elasticache_config.parameter_group_name,
            parameter_group_family=elasticache_config.parameter_group_family,
            parameter_group_parameters=elasticache_config.parameter_group_parameters,
            auto_minor_version_upgrade=elasticache_config.auto_minor_version_upgrade,
            maintenance_window=elasticache_config.maintenance_window,
            snapshot_window=elasticache_config.snapshot_window,
            snapshot_retention_limit=elasticache_config.snapshot_retention_limit,
            referenced_security_group_ids=elasticache_referenced_security_group_ids,
        ),
        tags=tags,
    )

buckets: dict[str, aws.s3.BucketV2] = {}

for bucket_name in bucket_names:
    bucket = aws.s3.BucketV2(
        f"{bucket_name}-bucket",
        bucket=bucket_name,
        force_destroy=False,
        tags=tags,
        opts=pulumi.ResourceOptions(protect=True),
    )

    aws.s3.BucketPublicAccessBlock(
        f"{bucket_name}-bucket-public-access-block",
        bucket=bucket.id,
        block_public_acls=True,
        block_public_policy=True,
        ignore_public_acls=True,
        restrict_public_buckets=True,
        opts=pulumi.ResourceOptions(protect=True, parent=bucket),
    )

    buckets[bucket_name] = bucket


pulumi.export(
    "cache-service",
    CacheServiceExp(
        bucket_arns={name: b.arn for name, b in buckets.items()},
        bucket_ids={name: b.id for name, b in buckets.items()},
        elasticache=ElastiCacheExp.from_resource(elasticache) if elasticache else None,
    ),
)

import os
from dataclasses import dataclass
from typing import Any

import pulumi
import pulumi_aws as aws
from pydantic import TypeAdapter

from pm_infra.orgs.org_setup import OrgSetup
from pm_infra.project_exports import NetworkInternalExp
from pm_infra.utils.tags import Tags


@dataclass
class SecurityGroupConfig:
    shares: list[str]


def create_shared_security_groups(
    vpc_id: Any,
    tags: Tags,
) -> dict[str, aws.ec2.SecurityGroup]:
    """
    Create security groups that are shared across accounts via AWS RAM.
    """
    org_config: OrgSetup = OrgSetup.load(os.path.join("..", "orgs", "orgs.json"))

    pulumi_config = pulumi.Config()
    conf_security_groups: dict[str, SecurityGroupConfig] = (
        TypeAdapter(dict[str, SecurityGroupConfig]).validate_json(pulumi_config.require("security-groups"))
        if pulumi_config.get("security-groups")
        else {}
    )
    security_groups = {}
    for key, config in conf_security_groups.items():
        security_group = aws.ec2.SecurityGroup(
            f"{key}-security-group",
            description=f"Security group to allow access to {key}",
            vpc_id=vpc_id,
            tags=tags,
        )
        security_groups[key] = security_group

        resource_share = aws.ram.ResourceShare(
            f"{key}-security-group-share",
            name=f"{key}-security-group-share",
            allow_external_principals=False,
            tags=tags,
        )

        account_ids = [org_config.account_map[alias] for alias in config.shares]

        for i, account_id in enumerate(account_ids):
            aws.ram.PrincipalAssociation(
                f"{key}-security-group-share-principal-{i}",
                resource_share_arn=resource_share.arn,
                principal=account_id,
            )

        aws.ram.ResourceAssociation(
            f"{key}-security-group-share-association",
            resource_share_arn=resource_share.arn,
            resource_arn=security_group.arn,
        )

    return security_groups


def create_internal(
    vpc_id: Any,
    tags: Tags,
) -> NetworkInternalExp:
    security_groups = create_shared_security_groups(vpc_id=vpc_id, tags=tags)

    cache_sg = security_groups.get("cache-service-elasticache")
    search_sg = security_groups.get("search-opensearch")

    # Resolve the network account ID from orgs.json via the configured AWS profile,
    # avoiding an STS GetCallerIdentity call that requires real credentials.
    aws_profile = pulumi.Config("aws").require("profile")
    org_config = OrgSetup.load(os.path.join("..", "orgs", "orgs.json"))
    network_account = next(
        (acc for acc in org_config.accounts if acc.profile_name == aws_profile), None
    )
    if network_account is None:
        raise ValueError(f"No account in orgs.json with profile_name '{aws_profile}'")

    return NetworkInternalExp(
        internal_services_security_group_id=security_groups["internal-services"].id,
        internal_account_id=network_account.account_number,
        cache_service_elasticache_security_group_id=cache_sg.id if cache_sg else None,
        search_opensearch_security_group_id=search_sg.id if search_sg else None,
    )

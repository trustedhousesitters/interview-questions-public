from dataclasses import dataclass
from typing import Any

import pulumi
import pulumi_aws as aws

from pm_infra.utils.exports import BaseExp, SecurityGroupExp
from pm_infra.utils.tags import Tags


@dataclass(kw_only=True)
class ElastiCacheArgs:
    vpc_id: Any
    subnet_ids: list[Any]
    replication_group_id: str
    engine_version: str
    node_type: str
    num_cache_clusters: int
    parameter_group_name: str | None = None
    auto_minor_version_upgrade: bool
    maintenance_window: str
    snapshot_window: str
    snapshot_retention_limit: int
    parameter_group_family: str | None = None
    parameter_group_parameters: list[dict[str, str]] | None = None
    referenced_security_group_ids: list[str] | None = None


class ElastiCache(pulumi.ComponentResource):
    def __init__(
        self,
        name: str,
        args: ElastiCacheArgs,
        opts: pulumi.ResourceOptions | None = None,
        tags: Tags | None = None,
    ):
        super().__init__("pm:cache:ElastiCache", name, {}, opts)

        parameter_group = None
        if args.parameter_group_family:
            parameter_group = aws.elasticache.ParameterGroup(
                f"{name}-parameter-group",
                family=args.parameter_group_family,
                parameters=[
                    aws.elasticache.ParameterGroupParameterArgs(name=p["name"], value=p["value"])
                    for p in (args.parameter_group_parameters or [])
                ],
                tags=tags,
                opts=pulumi.ResourceOptions(parent=self),
            )

        self.subnet_group = aws.elasticache.SubnetGroup(
            f"{name}-subnet-group",
            subnet_ids=args.subnet_ids,
            description=f"ElastiCache subnet group for {name}",
            tags=tags,
            opts=pulumi.ResourceOptions(parent=self),
        )

        self.security_group = aws.ec2.SecurityGroup(
            f"{name}-sg",
            description=f"Security group for ElastiCache {name}",
            vpc_id=args.vpc_id,
            tags=tags,
            opts=pulumi.ResourceOptions(parent=self),
        )

        if args.referenced_security_group_ids:
            for i, referenced_security_group_id in enumerate(args.referenced_security_group_ids):
                aws.vpc.SecurityGroupIngressRule(
                    f"{name}-sg-referenced-security-group-ingress-rule-{i}",
                    from_port=6379,
                    to_port=6379,
                    ip_protocol="tcp",
                    security_group_id=self.security_group.id,
                    referenced_security_group_id=referenced_security_group_id,
                    opts=pulumi.ResourceOptions(parent=self.security_group),
                )

        self.replication_group = aws.elasticache.ReplicationGroup(
            f"{name}-replication-group",
            replication_group_id=args.replication_group_id,
            description=f"Redis cluster for {name}",
            engine_version=args.engine_version,
            cluster_mode="disabled",
            multi_az_enabled=args.num_cache_clusters > 1,
            automatic_failover_enabled=args.num_cache_clusters > 1,
            node_type=args.node_type,
            num_cache_clusters=args.num_cache_clusters,
            parameter_group_name=parameter_group.name if parameter_group else args.parameter_group_name,
            port=6379,
            security_group_ids=[self.security_group.id],
            subnet_group_name=self.subnet_group.name,
            auto_minor_version_upgrade=args.auto_minor_version_upgrade,
            maintenance_window=args.maintenance_window,
            snapshot_window=args.snapshot_window,
            snapshot_retention_limit=args.snapshot_retention_limit,
            tags=tags,
            opts=pulumi.ResourceOptions(parent=self),
        )

        self.register_outputs(
            {
                "subnet_group_name": self.subnet_group.name,
                "security_group_id": self.security_group.id,
                "primary_endpoint": self.replication_group.primary_endpoint_address,
            }
        )


@dataclass
class ElastiCacheExp(BaseExp):
    subnet_group_name: Any
    security_group_id: Any
    security_group: SecurityGroupExp
    primary_endpoint: Any

    @classmethod
    def from_resource(cls, resource: ElastiCache):
        return cls(
            subnet_group_name=resource.subnet_group.name,
            security_group_id=resource.security_group.id,
            security_group=SecurityGroupExp.from_resource(resource.security_group),
            primary_endpoint=resource.replication_group.primary_endpoint_address,
        )

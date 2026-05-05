import logging
from dataclasses import dataclass, field
from typing import Any

import pulumi
import pulumi_aws as aws
from pulumi.runtime.sync_await import _sync_await
from pydantic import TypeAdapter

from ...utils.exports import BaseExp, VpcExp
from ...utils.tags import Tags

logger = logging.getLogger()


def get_azs():
    return aws.get_availability_zones(state="available").names


@dataclass(kw_only=True)
class SubnetsArgs:
    base_name: str = "subnet"
    cidrs: list[str] = field(default_factory=list)
    azs: list[str] = field(default_factory=list)
    reservations: dict[str, list[str]] = field(default_factory=dict)
    public: bool = False


@dataclass(kw_only=True)
class NatArgs:
    cidrs: list[str] = field(default_factory=list)
    azs: list[str] = field(default_factory=list)


@dataclass(kw_only=True)
class IngressArgs(NatArgs):
    pass


@dataclass(kw_only=True)
class PrivateArgs(NatArgs):
    pass


@dataclass(kw_only=True)
class FullVpcArgs:
    cidr: str
    nat: NatArgs
    ingress: IngressArgs
    private: PrivateArgs
    groups: list[SubnetsArgs] = field(default_factory=list)


class SubnetsGroup(pulumi.ComponentResource):
    def __init__(
        self,
        name: str,
        vpc_id: Any,
        subnets_args: SubnetsArgs,
        route_tables: list[aws.ec2.RouteTable],
        opts: pulumi.ResourceOptions | None = None,
        tags: Tags | None = None,
    ):
        tags = tags or {}
        super().__init__("pm:net:SubnetGroup", name, {}, opts)
        self.subnets_args = subnets_args
        self.route_table_ids = [route_table.id for route_table in route_tables]

        self.subnets = []
        for i_num, (i_cidr, i_az) in enumerate(zip(self.subnets_args.cidrs, self.subnets_args.azs, strict=True)):
            tags_subnet = dict(tags)
            tags_subnet["Name"] = f"{self.subnets_args.base_name} (num. {i_num + 1})"
            subnet = aws.ec2.Subnet(
                f"{name}-{i_num}",
                vpc_id=vpc_id,
                cidr_block=i_cidr,
                map_public_ip_on_launch=self.subnets_args.public,
                availability_zone=i_az,
                opts=pulumi.ResourceOptions(parent=self),
                tags=tags_subnet,
            )
            self.subnets.append(subnet)

            for reservation_name, reservation_cidrs in self.subnets_args.reservations.items():
                aws.ec2.SubnetCidrReservation(
                    f"{name}-res-{reservation_name}-{i_num}",
                    subnet_id=subnet.id,
                    cidr_block=reservation_cidrs[i_num],
                    description=reservation_name,
                    reservation_type="explicit",
                    opts=pulumi.ResourceOptions(parent=subnet),
                )

        self.register_outputs(dict(ids=self.subnet_ids, arns=self.subnet_arns))

    @property
    def subnet_arns(self):
        return [sub.arn for sub in self.subnets]

    @property
    def subnet_azs(self):
        return [sub.availability_zone for sub in self.subnets]

    @property
    def subnet_ids(self):
        return [sub.id for sub in self.subnets]


@dataclass
class SubnetsGroupExp(BaseExp):
    arns: list[Any]
    ids: list[Any]
    cidrs: list[str]
    azs: list[Any]
    route_table_ids: list[Any]
    reservations: dict[str, list[str]] | None = None

    @classmethod
    def from_resource(cls, resource: SubnetsGroup):
        return cls(
            arns=resource.subnet_arns,
            ids=resource.subnet_ids,
            cidrs=resource.subnets_args.cidrs,
            azs=resource.subnet_azs,
            route_table_ids=resource.route_table_ids,
            reservations=resource.subnets_args.reservations,
        )


class PrivateSubnets(pulumi.ComponentResource):
    def __init__(
        self,
        name: str,
        vpc_id: Any,
        private_route_tables: dict[str, aws.ec2.RouteTable],
        subnets_args: SubnetsArgs,
        opts: pulumi.ResourceOptions | None = None,
        tags: Tags | None = None,
    ):
        tags = tags or {}
        super().__init__("pm:net:PrivateSubnets", name, {}, opts)
        self.group = SubnetsGroup(
            f"{name}-group",
            vpc_id=vpc_id,
            route_tables=[private_route_tables[az] for az in subnets_args.azs],
            subnets_args=subnets_args,
            opts=pulumi.ResourceOptions(parent=self),
            tags=tags,
        )

        for num, (subnet, az) in enumerate(zip(self.group.subnets, subnets_args.azs, strict=True)):
            aws.ec2.RouteTableAssociation(
                f"{name}-tab-pri-assoc-{num + 1}",
                subnet_id=subnet.id,
                route_table_id=private_route_tables[az].id,
                opts=pulumi.ResourceOptions(parent=self.group),
            )

        self.register_outputs({})

    @property
    def subnet_ids(self):
        return self.group.subnet_ids

    @property
    def subnet_azs(self):
        return self.group.subnet_azs

    @property
    def subnet_arns(self):
        return self.group.subnet_arns


@dataclass
class PrivateSubnetsExp(BaseExp):
    subnets: SubnetsGroupExp

    @classmethod
    def from_resource(cls, resource: Any):
        return cls(subnets=SubnetsGroupExp.from_resource(resource.group))


class PublicSubnets(pulumi.ComponentResource):
    def __init__(
        self,
        name: str,
        vpc_id: Any,
        public_route_table: aws.ec2.RouteTable,
        subnets_args: SubnetsArgs,
        opts: pulumi.ResourceOptions | None = None,
        tags: Tags | None = None,
    ):
        tags = tags or {}
        super().__init__("pm:net:PublicSubnets", name, {}, opts)
        self.group = SubnetsGroup(
            f"{name}-group",
            vpc_id=vpc_id,
            route_tables=[public_route_table],
            subnets_args=subnets_args,
            opts=pulumi.ResourceOptions(parent=self),
            tags=tags,
        )

        for num, subnet in enumerate(self.group.subnets):
            aws.ec2.RouteTableAssociation(
                f"{name}-tabasso-{num + 1}",
                subnet_id=subnet.id,
                route_table_id=public_route_table.id,
                opts=pulumi.ResourceOptions(parent=self),
            )
        self.register_outputs({})

    @property
    def subnet_ids(self):
        return self.group.subnet_ids

    @property
    def subnet_azs(self):
        return self.group.subnet_azs

    @property
    def subnet_arns(self):
        return self.group.subnet_arns


@dataclass
class PublicSubnetsExp(BaseExp):
    subnets: SubnetsGroupExp

    @classmethod
    def from_resource(cls, resource: Any):
        return cls(subnets=SubnetsGroupExp.from_resource(resource.group))


@dataclass
class FullVpcExp(BaseExp):
    vpc: VpcExp
    groups: dict[str, PrivateSubnetsExp | PublicSubnetsExp]
    ingress: PublicSubnetsExp | None = None
    private: PrivateSubnetsExp | None = None

    @classmethod
    def from_resource(cls, resource: Any):
        def _single_group(grp: PrivateSubnets | PublicSubnets) -> PrivateSubnetsExp | PublicSubnetsExp:
            if isinstance(grp, PublicSubnets):
                return PublicSubnetsExp.from_resource(grp)
            elif isinstance(grp, PrivateSubnets):
                return PrivateSubnetsExp.from_resource(grp)
            else:
                raise TypeError("group must be `PrivateSubnets | PublicSubnets`")

        groups = {name: _single_group(grp) for name, grp in resource.groups.items()}

        return cls(
            vpc=VpcExp.from_resource(resource.vpc),
            ingress=PublicSubnetsExp.from_resource(resource.ingress),
            private=PrivateSubnetsExp.from_resource(resource.private),
            groups=groups,
        )

    @classmethod
    def from_network_stack_reference(cls, network_stack_reference: pulumi.StackReference) -> "FullVpcExp":
        # Get the full output (resolve all outputs)
        vpc_data = _sync_await(network_stack_reference.get_output_details("vpc")).value
        return TypeAdapter(FullVpcExp).validate_python(vpc_data)


class FullVpc(pulumi.ComponentResource):
    def __init__(
        self,
        name: str,
        vpc_args: FullVpcArgs,
        opts: pulumi.ResourceOptions | None = None,
        tags: Tags | None = None,
    ):
        tags = tags or {}
        super().__init__("pm:net:FullVpc", name, {}, opts)
        self.vpc_args = vpc_args

        vpc_tags = dict(tags)
        if "Name" not in vpc_tags and "Stack" in vpc_tags:
            vpc_tags["Name"] = vpc_tags["Stack"]

        self.vpc = aws.ec2.Vpc(
            f"{name}-vpc",
            cidr_block=self.vpc_args.cidr,
            enable_dns_hostnames=True,
            enable_dns_support=True,
            opts=pulumi.ResourceOptions(parent=self),
            tags=vpc_tags,
        )

        self.igw = aws.ec2.InternetGateway(
            f"{name}-igw", vpc_id=self.vpc.id, opts=pulumi.ResourceOptions(parent=self), tags=tags
        )

        public_route_table = aws.ec2.RouteTable(
            f"{name}-public-tab",
            vpc_id=self.vpc.id,
            opts=pulumi.ResourceOptions(parent=self),
            tags={**tags, **{"Name": "Public"}},
        )

        aws.ec2.Route(
            f"{name}-public-tab-route-igw",
            route_table_id=public_route_table.id,
            destination_cidr_block="0.0.0.0/0",
            gateway_id=self.igw.id,
            opts=pulumi.ResourceOptions(parent=public_route_table),
        )

        private_route_tables = {}
        for az in vpc_args.nat.azs:
            private_route_table = aws.ec2.RouteTable(
                f"{name}-private-tab-{az}",
                vpc_id=self.vpc.id,
                opts=pulumi.ResourceOptions(parent=self),
                tags={**tags, **{"Name": f"Private ({az})"}},
            )
            private_route_tables[az] = private_route_table

        nat_subnets = PublicSubnets(
            f"{name}-natgws",
            self.vpc.id,
            public_route_table,
            subnets_args=SubnetsArgs(base_name="nat", cidrs=vpc_args.nat.cidrs, azs=vpc_args.nat.azs, public=True),
            opts=pulumi.ResourceOptions(parent=self),
            tags=tags,
        )

        for az, nat_subnet in zip(vpc_args.nat.azs, nat_subnets.group.subnets, strict=True):
            nat_eip = aws.ec2.Eip(
                f"{name}-nat-eip-{az}",
                opts=pulumi.ResourceOptions(parent=self),
                tags={**tags, **{"Name": f"Private ({az})"}},
            )
            natgw = aws.ec2.NatGateway(
                f"{name}-natgw-{az}",
                allocation_id=nat_eip.id,
                subnet_id=nat_subnet.id,
                opts=pulumi.ResourceOptions(parent=self),
                tags={**tags, **{"Name": f"Private ({az})"}},
            )
            aws.ec2.Route(
                f"{name}-private-tab-route-natgw-{az}",
                route_table_id=private_route_tables[az].id,
                destination_cidr_block="0.0.0.0/0",
                nat_gateway_id=natgw.id,
                opts=pulumi.ResourceOptions(parent=self),
            )

        self.ingress = PublicSubnets(
            f"{name}-ingress",
            self.vpc.id,
            public_route_table,
            subnets_args=SubnetsArgs(
                base_name="ingress", cidrs=vpc_args.ingress.cidrs, azs=vpc_args.ingress.azs, public=True
            ),
            opts=pulumi.ResourceOptions(parent=self),
            tags=tags,
        )

        self.private = PrivateSubnets(
            f"{name}-private",
            self.vpc.id,
            private_route_tables,
            subnets_args=SubnetsArgs(
                base_name="private", cidrs=vpc_args.private.cidrs, azs=vpc_args.private.azs, public=False
            ),
            opts=pulumi.ResourceOptions(parent=self),
            tags=tags,
        )

        self.groups: dict[str, PublicSubnets | PrivateSubnets] = {}
        for group_config in self.vpc_args.groups:
            if group_config.public:
                new_group = PublicSubnets(
                    f"{name}-{group_config.base_name}",
                    self.vpc.id,
                    public_route_table,
                    subnets_args=group_config,
                    opts=pulumi.ResourceOptions(parent=self),
                    tags=tags,
                )
            else:
                new_group = PrivateSubnets(
                    f"{name}-{group_config.base_name}",
                    self.vpc.id,
                    private_route_tables,
                    subnets_args=group_config,
                    opts=pulumi.ResourceOptions(parent=self),
                    tags=tags,
                )
            self.groups[group_config.base_name] = new_group

        self.register_outputs(dict(id=self.vpc.id, vpc=self.vpc.arn, igw=self.igw.arn))

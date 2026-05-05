from dataclasses import dataclass, field

import pulumi
from pydantic import TypeAdapter

from pm_infra.components.full_vpc import (
    FullVpc,
    FullVpcArgs,
    FullVpcExp,
    FullVpcShare,
    FullVpcShareExp,
    IngressArgs,
    NatArgs,
    PrivateArgs,
    SubnetsArgs,
)
from pm_infra.utils.tags import Tags


@dataclass
class NatConfig:
    azs: list[str]
    cidrs: list[str]


@dataclass
class IngressConfig(NatConfig):
    pass


@dataclass
class PrivateConfig(NatConfig):
    pass


@dataclass
class VpcConfig:
    cidr: str
    nat: NatConfig
    ingress: IngressConfig
    private: PrivateConfig


@dataclass
class ServiceConfig:
    azs: list[str]
    cidrs: list[str]
    reservations: dict[str, list[str]] = field(default_factory=dict)
    public: bool = False
    shares: list[str] = field(default_factory=list)


def create_vpc(tags: Tags) -> tuple[FullVpcExp, list[FullVpcShareExp]]:
    config = pulumi.Config()

    conf_vpc: VpcConfig = TypeAdapter(VpcConfig).validate_json(config.require("vpc"))

    conf_services: dict[str, ServiceConfig] = TypeAdapter(dict[str, ServiceConfig]).validate_json(
        config.require("services")
    )

    vpc = FullVpc(
        "vpc",
        vpc_args=FullVpcArgs(
            cidr=conf_vpc.cidr,
            nat=NatArgs(cidrs=conf_vpc.nat.cidrs, azs=conf_vpc.nat.azs),
            ingress=IngressArgs(cidrs=conf_vpc.ingress.cidrs, azs=conf_vpc.ingress.azs),
            private=PrivateArgs(cidrs=conf_vpc.private.cidrs, azs=conf_vpc.private.azs),
            groups=[
                SubnetsArgs(
                    base_name=name,
                    cidrs=conf.cidrs,
                    azs=conf.azs,
                    reservations=conf.reservations,
                    public=conf.public,
                )
                for name, conf in conf_services.items()
            ],
        ),
        tags=tags,
    )

    shared: list[FullVpcShare] = [
        FullVpcShare.from_full_vpc(
            name=name,
            vpc=vpc,
            accounts=conf.shares,
            allow_external=True,
            tags=tags,
        )
        for name, conf in conf_services.items()
        if conf.shares
    ]

    return FullVpcExp.from_resource(vpc), [FullVpcShareExp.from_resource(ishared) for ishared in shared]

import logging
import os
from dataclasses import dataclass
from typing import Any

import pulumi
import pulumi_aws as aws

from ...utils.exports import BaseExp
from ...utils.tags import Tags
from .vpc_resources import FullVpc
from pm_infra.orgs.org_setup import OrgSetup

logger = logging.getLogger(__name__)

orgs_path = "../orgs"
orgs_file = "orgs.json"


@dataclass(kw_only=True)
class FullVpcShareArgs:
    name: str
    vpc_arn: Any
    accounts: list[str] | None = None
    subnet_arns: list[str]
    allow_external: bool = False

    @classmethod
    def from_full_vpc(
        cls,
        *,
        name: str,
        vpc: FullVpc,
        accounts: list[str] | None = None,
        allow_external: bool = False,
    ):
        shares = vpc.groups[name].subnet_arns
        return FullVpcShareArgs(
            name=name, vpc_arn=vpc.vpc.arn, subnet_arns=shares, accounts=accounts, allow_external=allow_external
        )


class FullVpcShare(pulumi.ComponentResource):
    def __init__(
        self,
        name: str,
        share_args: FullVpcShareArgs,
        opts: pulumi.ResourceOptions | None = None,
        tags: Tags | None = None,
    ):
        super().__init__("pm:net:FullVpcShare", name, {}, opts)
        self.share_args = share_args
        self.share = aws.ram.ResourceShare(
            name,
            name=self.share_args.name,
            allow_external_principals=self.share_args.allow_external,
            opts=pulumi.ResourceOptions(parent=self),
            tags=tags,
        )
        self.subnet_associations = []
        for i_num, subnet_arn in enumerate(self.share_args.subnet_arns):
            assoc = aws.ram.ResourceAssociation(
                f"{name}-assoc-{i_num}",
                resource_arn=subnet_arn,
                resource_share_arn=self.share.arn,
                opts=pulumi.ResourceOptions(parent=self),
            )
            self.subnet_associations.append(assoc)
        self.acc_associations: list[aws.ram.PrincipalAssociation] = []
        if self.share_args.accounts:
            if self.share_args.allow_external:
                org_config: OrgSetup = OrgSetup.load(os.path.join(orgs_path, orgs_file))
                accounts = [org_config.account_map[alias] for alias in self.share_args.accounts]

                for i_num, acc in enumerate(accounts):
                    assoc = aws.ram.PrincipalAssociation(
                        f"{name}-assoc-acc-{i_num}",
                        principal=acc,
                        resource_share_arn=self.share.arn,
                        opts=pulumi.ResourceOptions(parent=self),
                    )
                    self.acc_associations.append(assoc)
            else:
                logger.warning(
                    "account ids are provided but allow_external is set to false, "
                    "skipping the account associations..."
                )

    @classmethod
    def from_full_vpc(
        cls,
        *,
        name: str,
        vpc: FullVpc,
        accounts: list[str] | None = None,
        allow_external: bool = False,
        tags: Tags | None = None,
    ):
        args = FullVpcShareArgs.from_full_vpc(
            name=name,
            vpc=vpc,
            accounts=accounts,
            allow_external=allow_external,
        )
        return cls(f"shr-{name}", share_args=args, tags=tags)


@dataclass
class FullVpcShareExp(BaseExp):
    id: Any
    arn: Any
    name: Any
    subnet_ids: list[Any]
    principal_ids: list[Any]

    @classmethod
    def from_resource(cls, resource: FullVpcShare):
        sub_assocs = [assoc.id for assoc in resource.subnet_associations]
        pri_assocs = [assoc.id for assoc in resource.acc_associations]
        return cls(
            id=resource.share.id,
            arn=resource.share.arn,
            name=resource.share.name,
            subnet_ids=sub_assocs,
            principal_ids=pri_assocs,
        )

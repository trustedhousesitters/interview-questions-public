import pulumi
from internal import create_internal
from vpc import create_vpc

from pm_infra.utils.tags import get_aws_tags

tags = get_aws_tags()

# Core VPC configuration including RAM sharing of subnets to other accounts
vpc_exp, share_exp = create_vpc(tags=tags)

# Create shared security groups for cross-account access
network_internal_exp = create_internal(
    vpc_exp.vpc.id,
    tags=tags,
)

pulumi.export("vpc", vpc_exp)
pulumi.export("shared", share_exp)
pulumi.export("network_internal", network_internal_exp)

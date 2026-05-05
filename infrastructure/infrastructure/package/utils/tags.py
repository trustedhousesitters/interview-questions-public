import logging

import pulumi

logger = logging.getLogger(__name__)
Tags = dict[str, str | pulumi.Output]


def get_stack_name(
    org: pulumi.Output[str] | str, project: pulumi.Output[str] | str, env: pulumi.Output[str] | str
) -> pulumi.Output[str] | str:
    def _to_stack_name(args):
        org_str, project_str, env_str = args
        name = f"{org_str}/{project_str}/{env_str}"
        logger.info(f"getting stack name: '{name}'...")
        return name

    return pulumi.Output.all(org, project, env).apply(_to_stack_name)


def get_aws_tags(**others) -> Tags:
    org = pulumi.get_organization()
    env = pulumi.get_stack()
    prj = pulumi.get_project()
    try:
        stack_name = get_stack_name(org, prj, env)
    except RuntimeError:
        stack_name = ""
    tags = {
        "Org": org,
        "Env": env,
        "Project": prj,
        "Stack": stack_name,
    }
    tags.update(others)
    return tags

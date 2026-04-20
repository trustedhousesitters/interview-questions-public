from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Any, TypeVar

ClsType = TypeVar("ClsType")


@dataclass
class BaseExp(ABC):
    @classmethod
    @abstractmethod
    def from_resource(cls: type[ClsType], resource: Any) -> ClsType:
        """Initialise export object from a Pulumi resource"""
        ...


@dataclass
class SimpleExp(BaseExp):
    id: Any
    arn: Any

    @classmethod
    def from_resource(cls, resource: Any):
        if not hasattr(resource, "id") or not hasattr(resource, "arn"):
            raise TypeError("pulumi AWS resource must have an id and arn")
        return cls(id=resource.id, arn=resource.arn)


@dataclass
class VpcExp(BaseExp):
    arn: Any
    id: Any

    @classmethod
    def from_resource(cls, resource: Any):
        return cls(arn=resource.arn, id=resource.id)


@dataclass
class SecurityGroupExp(BaseExp):
    arn: Any
    id: Any

    @classmethod
    def from_resource(cls, resource: Any):
        return cls(id=resource.id, arn=resource.arn)

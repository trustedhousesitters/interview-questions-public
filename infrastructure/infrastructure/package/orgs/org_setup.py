import json
import logging
import os
from dataclasses import dataclass
from typing import TypeVar

from pydantic import TypeAdapter

logger = logging.getLogger(__name__)

ClassVar = TypeVar("ClassVar")


@dataclass
class AccountConfig:
    account_number: str
    alias: str
    profile_name: str


@dataclass(kw_only=True)
class OrgSetup:
    """Dataclass to manage the AWS accounts and organizations"""

    management_alias: str = "management"
    accounts: list[AccountConfig]

    @classmethod
    def load(cls: type[ClassVar], file_name: str) -> ClassVar:
        """Load the class from a json file"""
        with open(file_name) as fid:
            data = json.load(fid)
        return TypeAdapter(cls).validate_python(data)

    @property
    def aliases(self) -> list[str]:
        return [acc.alias for acc in self.accounts]

    @property
    def account_map(self) -> dict:
        """Dict of alias: account_number"""
        return {acc.alias: acc.account_number for acc in self.accounts}

    def by_alias(self, alias: str) -> AccountConfig:
        try:
            return next(acc for acc in self.accounts if acc.alias == alias)
        except StopIteration:
            raise KeyError(f"account '{alias}' not found")

    @property
    def management(self) -> AccountConfig:
        return self.by_alias(self.management_alias)

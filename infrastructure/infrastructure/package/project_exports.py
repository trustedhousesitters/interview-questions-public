"""Export dataclasses for cross-stack use"""

from dataclasses import dataclass
from typing import Any

from .components.elasticache import ElastiCacheExp


@dataclass
class NetworkInternalExp:
    internal_services_security_group_id: Any
    internal_account_id: str
    cache_service_elasticache_security_group_id: Any | None = None
    search_opensearch_security_group_id: Any | None = None


@dataclass
class CacheServiceExp:
    bucket_arns: dict[str, Any]
    bucket_ids: dict[str, Any]
    elasticache: ElastiCacheExp | None = None


@dataclass
class SearchExp:
    # TODO: Define exports for the search service stack
    pass

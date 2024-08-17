from datetime import datetime

import pytz
from neomodel import config, StructuredRel
import os

from neomodel import (
    StructuredNode,
    AsyncStructuredNode,
    StringProperty,
    ArrayProperty,
    IntegerProperty,
    UniqueIdProperty,
    BooleanProperty,
    DateTimeProperty,
    RelationshipTo,
    RelationshipFrom,
    JSONProperty,
)


class AwesomeListRepoRel(StructuredRel):
    pass


class AwesomeListFromRepoRel(StructuredRel):
    pass


class BaseRepo:
    uid = UniqueIdProperty()
    owner = StringProperty()
    name = StringProperty(required=True)
    stars = IntegerProperty(default=-1)
    url = StringProperty(unique_index=True, required=True)
    updated_at = DateTimeProperty(default_now=True)
    created_at = DateTimeProperty(default_now=True)
    missing = BooleanProperty(default=False)
    # Repo Metadata
    description = StringProperty()
    diskUsage = IntegerProperty()
    forkCount = IntegerProperty()
    hasSponsorshipsEnabled = BooleanProperty()
    homepageUrl = StringProperty()
    license = StringProperty()
    licenseInfo = JSONProperty()
    openIssuesCount = IntegerProperty()
    pullRequestsCount = IntegerProperty()
    releasesCount = IntegerProperty()
    repoPushedAt = DateTimeProperty()
    repoUpdatedAt = DateTimeProperty()
    repoCreatedAt = DateTimeProperty()
    watchersCount = IntegerProperty()
    createdAt = DateTimeProperty(default_now=True)
    awesomeList = RelationshipTo(
        "AwesomeList", "IN_AWESOME_LIST", model=AwesomeListRepoRel
    )


class Repo(BaseRepo, StructuredNode):
    pass


class BaseAwesomeList:
    uid = UniqueIdProperty()
    name = StringProperty(required=True)
    url = StringProperty(unique_index=True, required=True)
    tags = ArrayProperty(StringProperty())
    lastRefreshTime = DateTimeProperty(default_now=True)
    createdAt = DateTimeProperty(default_now=True)
    isFrom = RelationshipTo("Repo", "IS_FROM", model=AwesomeListFromRepoRel)
    repos = RelationshipFrom(Repo, "IN_AWESOME_LIST")


class AwesomeList(BaseAwesomeList, StructuredNode):
    pass

    # since = DateTimeProperty(
    #     default=lambda: datetime.now(pytz.utc),
    #     index=True
    # )
    # met = StringProperty()
    # # Uniqueness constraints for relationship properties
    # # are only available from Neo4j version 5.7 onwards
    # meeting_id = StringProperty(unique_index=True)

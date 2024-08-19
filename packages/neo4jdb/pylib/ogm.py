from datetime import datetime

import neo4j
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


class CustomDateTimeProperty(DateTimeProperty):
    def inflate(self, value, obj=None):
        if isinstance(value, neo4j.time.DateTime):
            # Convert to Python datetime
            return datetime(
                value.year,
                value.month,
                value.day,
                value.hour,
                value.minute,
                value.second,
                # value.microsecond, value.tzinfo
            )
        return super().inflate(value, obj)


class AwesomeListRepoRel(StructuredRel):
    pass


class AwesomeListFromRepoRel(StructuredRel):
    pass


class BaseRepo:
    id = UniqueIdProperty()
    owner = StringProperty()
    name = StringProperty(required=True)
    stars = IntegerProperty(default=-1)
    url = StringProperty(unique_index=True, required=True)
    missing = BooleanProperty(default=False)
    lastModified = CustomDateTimeProperty()
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
    repoPushedAt = CustomDateTimeProperty()
    repoUpdatedAt = CustomDateTimeProperty()
    repoCreatedAt = CustomDateTimeProperty()
    watchersCount = IntegerProperty()
    createdAt = CustomDateTimeProperty()
    awesomeListsIsFrom = RelationshipFrom(
        "AwesomeList", "IS_FROM", model=AwesomeListFromRepoRel
    )
    inAwesomeListAwesomeLists = RelationshipTo(
        "AwesomeList", "IN_AWESOME_LIST", model=AwesomeListRepoRel
    )


class Repo(BaseRepo, StructuredNode):
    pass


# class BaseAwesomeList:
#     uid = UniqueIdProperty()
#     name = StringProperty(required=True)
#     url = StringProperty(unique_index=True, required=True)
#     tags = ArrayProperty(StringProperty())
#     lastRefreshTime = DateTimeProperty()
#     lastModified = DateTimeProperty()


class AwesomeList(StructuredNode):
    uid = UniqueIdProperty()
    name = StringProperty(required=True)
    url = StringProperty(unique_index=True, required=True)
    tags = ArrayProperty(StringProperty())
    lastRefreshTime = CustomDateTimeProperty()
    lastModified = CustomDateTimeProperty()
    isFromRepo = RelationshipTo("Repo", "IS_FROM", model=AwesomeListFromRepoRel)
    repos = RelationshipFrom(Repo, "IN_AWESOME_LIST")

    # since = DateTimeProperty(
    #     default=lambda: datetime.now(pytz.utc),
    #     index=True
    # )
    # met = StringProperty()
    # # Uniqueness constraints for relationship properties
    # # are only available from Neo4j version 5.7 onwards
    # meeting_id = StringProperty(unique_index=True)

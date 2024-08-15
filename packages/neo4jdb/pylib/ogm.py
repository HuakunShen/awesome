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
    JSONProperty,
)


class Repo(AsyncStructuredNode):
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
    awesomeList = RelationshipTo("AwesomeList", "IN_AWESOME_LIST")


class AwesomeList(AsyncStructuredNode):
    uid = UniqueIdProperty()
    name = StringProperty(required=True)
    url = StringProperty(unique_index=True, required=True)
    tags = ArrayProperty(StringProperty())
    lastRefreshTime = DateTimeProperty(default_now=True)
    createdAt = DateTimeProperty(default_now=True)

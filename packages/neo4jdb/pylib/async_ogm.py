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
from .ogm import BaseRepo, BaseAwesomeList


class Repo(BaseRepo, AsyncStructuredNode):
    pass


class AwesomeList(BaseAwesomeList, AsyncStructuredNode):
    pass

from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from pocketbase.models.utils.base_model import BaseModel as PocketBaseModel


class AwesomeList(BaseModel):
    url: str
    type: str
    metadata: dict
    name: str
    created: datetime
    updated: datetime
    id: str

    def from_pb(x: PocketBaseModel):
        return AwesomeList.model_validate(x.__dict__)

    def from_list(x: list[PocketBaseModel]):
        return [AwesomeList.model_validate(i) for i in x]


class Repo(BaseModel):
    id: str
    stars: int
    description: Optional[str]
    missing: bool
    created: datetime
    updated: datetime
    name: str
    url: str
    metadata: Optional[dict]

    def from_pb(x: PocketBaseModel):
        return Repo.model_validate(x.__dict__)

    def from_list(x: list[PocketBaseModel]):
        return [Repo.model_validate(i) for i in x]


class IsAwesome(BaseModel):
    awesome_list: str
    repo: str

    def from_pb(x: PocketBaseModel):
        return IsAwesome.model_validate(x.__dict__)

    def from_list(x: list[PocketBaseModel]):
        return [IsAwesome.model_validate(i) for i in x]

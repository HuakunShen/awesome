import asyncio
from dotenv import load_dotenv

load_dotenv()
from pprint import pprint
from pymongo import MongoClient
from pymongo.database import Database
from pymongo.collection import Collection

from pylib.ogm import AwesomeList, Repo
from neomodel import (
    config,
    StructuredNode,
    StringProperty,
    IntegerProperty,
    UniqueIdProperty,
    RelationshipTo,
)
from pylib.constants import NEO4J_DATABASE_URL
from tqdm import tqdm
import os
import json

awesome_lists: list[AwesomeList] = AwesomeList.nodes.all()
for lst in tqdm(awesome_lists):
    print(lst.url)
    repo = Repo.nodes.get(url=lst.url)
    print(repo)
    lst.isFrom.connect(repo)

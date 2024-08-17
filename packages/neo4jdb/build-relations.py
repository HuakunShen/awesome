import asyncio
from pprint import pprint
from pymongo import MongoClient
from pymongo.database import Database
from pymongo.collection import Collection
from dotenv import load_dotenv

load_dotenv()
from pylib.ogm import Repo, AwesomeList
from pylib import async_ogm
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

raw_path = "/Users/hacker/Dev/projects/awesome/packages/scraper/awesome-repo.json"
config.DATABASE_URL = NEO4J_DATABASE_URL

with open(raw_path, "r") as f:
    data = json.load(f)

# print()

async def create_is_awesome_relation(repo: async_ogm.Repo, awesome_list: async_ogm.AwesomeList):
    if repo:
        # print(f"connect {repo.name} to {awesome_list.name}")
        await repo.awesomeList.connect(awesome_list)
    else:
        print(f"skip {repo} to {awesome_list}")

    # else:
    #     print(f"skip {repo.name} to {awesome_list.name}")


for awesome_url, repo_urls in tqdm(data.items()):
    print(awesome_url)
    a_list: AwesomeList = AwesomeList.nodes.get(url=awesome_url)
    tasks = []
    for repo_url in repo_urls:
        repo: Repo = Repo.nodes.get_or_none(url=repo_url)
        # print(f"connect {repo.name} to {a_list.name}")
        if repo and not repo.awesomeList:
            repo.awesomeList.connect(a_list)
        a_list.repos
# async def main():
#     for awesome_url, repo_urls in tqdm(list(data.items())):
#         print(awesome_url)
#         a_list: async_ogm.AwesomeList = await async_ogm.AwesomeList.nodes.get(url=awesome_url)
#         tasks = []
#         for repo_url in repo_urls:
#             repo: async_ogm.Repo = await async_ogm.Repo.nodes.get_or_none(url=repo_url)
#             tasks.append(create_is_awesome_relation(repo, a_list))
#             # print(f"connect {repo.name} to {a_list.name}")
#             # if repo and not repo.awesomeList:
#             # repo.awesomeList.connect(a_list)
#         await asyncio.gather(*tasks)
#         print(f"Created {len(tasks)} relations for {a_list.name}")

# asyncio.run(main())

# this file migrate data from mongodb to neo4j
from pprint import pprint
from pymongo import MongoClient
from pymongo.database import Database
from pymongo.collection import Collection
from dotenv import load_dotenv

load_dotenv()
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

mongo_url = os.getenv("DATABASE_URL")
config.DATABASE_URL = NEO4J_DATABASE_URL

client = MongoClient(mongo_url)
db = client["awesome-github"]
awesome_list_collection = db["AwesomeList"]
repo_collection = db["Repo"]


awesome_lists = list(awesome_list_collection.find())

pprint(awesome_lists[0])
for mongo_a_lst in tqdm(awesome_lists):
    nlst = AwesomeList(
        name=mongo_a_lst["name"],
        url=mongo_a_lst["url"],
        tags=[],
        lastRefreshTime=mongo_a_lst["lastRefreshTime"],
        createdAt=mongo_a_lst["createdAt"],
    )
    nlst.save()

mongo_repos = list(repo_collection.find())


for repo in tqdm(mongo_repos):
    nrepo = Repo(
        owner=repo["owner"],
        name=repo["name"],
        stars=repo["stars"],
        url=repo["url"],
        updatedAt=repo["updatedAt"],
        createdAt=repo["createdAt"],
        missing=repo["missing"],
        description=repo["description"] if "description" in repo else None,
        diskUsage=repo["diskUsage"] if "diskUsage" in repo else 0,
        forkCount=repo["forkCount"],
        hasSponsorshipsEnabled=repo["hasSponsorshipsEnabled"],
        homepageUrl=repo["homepageUrl"] if "homepageUrl" in repo else None,
        license=repo["licenseInfo"]["key"] if "licenseInfo" in repo and repo["licenseInfo"] else None,
        licenseInfo=repo["licenseInfo"] if "licenseInfo" in repo else None,
        openIssuesCount=repo["openIssuesCount"],
        pullRequestsCount=repo["pullRequestsCount"],
        releasesCount=repo["releasesCount"],
        repoPushedAt=repo["repoPushedAt"],
        repoUpdatedAt=repo["repoUpdatedAt"],
        repoCreatedAt=repo["repoCreatedAt"],
        watchersCount=repo["watchersCount"],
    )
    nrepo.save()

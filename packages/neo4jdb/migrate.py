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


# awesome_lists = list(awesome_list_collection.find())

# pprint(awesome_lists[0])
# for mongo_a_lst in tqdm(awesome_lists):
#     nlst = AwesomeList(
#         name=mongo_a_lst["name"],
#         url=mongo_a_lst["url"],
#         tags=[],
#         lastRefreshTime=mongo_a_lst["lastRefreshTime"],
#         createdAt=mongo_a_lst["createdAt"],
#     )
#     # print(nlst)
#     nlst.save()
# # break

mongo_repos = list(repo_collection.find())
mongo_repos_url_set = set([repo["url"] for repo in mongo_repos])
neorepos = Repo.nodes.all()
neorepo_urls = [node.url for node in neorepos]
neourl_set = set(neorepo_urls)

# get difference
diff_urls = mongo_repos_url_set - neourl_set
pprint(diff_urls)
print(len(diff_urls))

for url in tqdm(diff_urls):
    # add these repos to neo4j
    repo = repo_collection.find_one({"url": url})
    pprint(repo)
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
    # break

# for repo in tqdm(repos):
#     nrepo = Repo(
#         owner=repo["owner"],
#         name=repo["name"],
#         stars=repo["stars"],
#         url=repo["url"],
#         updatedAt=repo["updatedAt"],
#         createdAt=repo["createdAt"],
#         missing=repo["missing"],
#         description=repo["description"],
#         diskUsage=repo["diskUsage"],
#         forkCount=repo["forkCount"],
#         hasSponsorshipsEnabled=repo["hasSponsorshipsEnabled"],
#         homepageUrl=repo["homepageUrl"],
#         license=repo["licenseInfo"]["key"] if repo["licenseInfo"] else None,
#         licenseInfo=repo["licenseInfo"],
#         openIssuesCount=repo["openIssuesCount"],
#         pullRequestsCount=repo["pullRequestsCount"],
#         releasesCount=repo["releasesCount"],
#         repoPushedAt=repo["repoPushedAt"],
#         repoUpdatedAt=repo["repoUpdatedAt"],
#         repoCreatedAt=repo["repoCreatedAt"],
#         watchersCount=repo["watchersCount"],
#     )
#     # print(nrepo)
#     nrepo.save()
# break

# all_awesome_lists = AwesomeList.nodes.all()
# print(all_awesome_lists[0])

# AwesomeList.nodes.create(
#     name=awesome_lists[0]["name"],
#     url=awesome_lists[0]["url"],
#     tags=awesome_lists[0]["tags"],
#     last_refresh_time=awesome_lists[0]["last_refresh_time"],
#     created_at=awesome_lists[0]["created_at"],
# )
# $ neomodel_inspect_database -db neo4j+s://neo4j:WtxpaB3XtVK0VgTcecmT4PKRcWi4SRU4XSqvKNu_YLQ@aea6d15a.databases.neo4j.io --write-to yourapp/models.py
# neomodel_install_labels pylib/ogm.py --db neo4j+s://neo4j:WtxpaB3XtVK0VgTcecmT4PKRcWi4SRU4XSqvKNu_YLQ@aea6d15a.databases.neo4j.io

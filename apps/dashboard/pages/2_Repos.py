from pprint import pp
import sys
from dashboard.utils import repo_root

sys.path.append(str(repo_root))
import streamlit as st
import pandas as pd
import pydeck as pdk
from urllib.error import URLError
from dashboard import dao
import os
from neomodel import config

config.DATABASE_URL = os.getenv("NEO4J_DATABASE_URL")

st.set_page_config(page_title="Repos", page_icon="🌍", layout="wide")

init_awesome_list_name = []
if "awesome-list" in st.query_params:
    init_awesome_list_name = st.query_params["awesome-list"]
    if not isinstance(init_awesome_list_name, list):
        init_awesome_list_name = [init_awesome_list_name]

awesome_lists = dao.all_awesome_lists()
options = st.multiselect(
    "Select Awesome Lists",
    [a.name for a in awesome_lists],
    # ['awesome-python'],
    # initial_awesome_lists,
    init_awesome_list_name,
)
# map name to url
options: dict = [
    {"name": a.name, "url": a.url} for a in awesome_lists if a.name in options
]
if not options:
    st.stop()
st.write("You Selected: ", options)
repos: list[dict] = []
for option in options:
    print("URL", option["url"])
    for repo in dao.get_awesome_list_repos(option["url"]):
        repos.append(
            {
                "Name": repo.name,
                "Stars": repo.stars,
                "Awesome List": option["name"],
                "Description": repo.description,
                "URL": repo.url,
                "Missing": repo.missing,
                "Disk Usage": repo.diskUsage,
                "Fork Count": repo.forkCount,
                "Has Sponsorships Enabled": repo.hasSponsorshipsEnabled,
                "Homepage Url": repo.homepageUrl,
                "License": repo.license,
                "Open Issues Count": repo.openIssuesCount,
                "Pull Requests Count": repo.pullRequestsCount,
                "Releases Count": repo.releasesCount,
                "Last Pushed At": repo.repoPushedAt,
                "Last Updated At": repo.repoUpdatedAt,
                "Created At": repo.repoCreatedAt,
                "Watchers Count": repo.watchersCount,
            }
        )

# repos = [
#     {
#         "Name": repo.name,
#         "Stars": repo.stars,
#         "Awesome List": option["name"],
#         "Description": repo.description,
#         "URL": repo.url,
#         "Missing": repo.missing,
#         "Disk Usage": repo.diskUsage,
#         "Fork Count": repo.forkCount,
#         "Has Sponsorships Enabled": repo.hasSponsorshipsEnabled,
#         "Homepage Url": repo.homepageUrl,
#         "License": repo.license,
#         "Open Issues Count": repo.openIssuesCount,
#         "Pull Requests Count": repo.pullRequestsCount,
#         "Releases Count": repo.releasesCount,
#         "Last Pushed At": repo.repoPushedAt,
#         "Last Updated At": repo.repoUpdatedAt,
#         "Created At": repo.repoCreatedAt,
#         "Watchers Count": repo.watchersCount,
#     }
#     for option in options
#     for repo in dao.get_awesome_list_repos(option["url"])
# ]
if not repos:
    print("No Repos Found")
    st.stop()
repos_df = pd.DataFrame(repos)
repos_df.sort_values(by="Stars", ascending=False, inplace=True)
repos_df.reset_index(drop=True, inplace=True)
repos_df["Star History"] = "/Repo_Star_History?repo_url=" + repos_df["URL"]
st.dataframe(
    repos_df,
    column_config={
        "URL": st.column_config.LinkColumn(),
        "Star History": st.column_config.LinkColumn(
            "Star History",
            help="Star History of the Repo",
            display_text="Star History",
        ),
    },
)

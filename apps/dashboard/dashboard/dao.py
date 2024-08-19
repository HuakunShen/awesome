import pandas as pd
from dashboard.model import AwesomeListRepo, Repo
from neomodel import db
from packages.neo4jdb.pylib import ogm
import streamlit as st


@st.cache_data
def all_awesome_lists() -> list[AwesomeListRepo]:
    # print("all_awesome_lists called")
    data = db.cypher_query(
        """
            MATCH (a:AwesomeList)-[:IS_FROM]->(r:Repo)
            RETURN a, r
            ORDER BY r.stars DESC;
        """,
        resolve_objects=True,
    )
    results = data[0]
    ret: list[AwesomeListRepo] = []
    for item in results:
        awesome_list: ogm.AwesomeList = item[0]
        repo: ogm.Repo = item[1]
        ret.append(
            AwesomeListRepo(
                owner=repo.owner,
                name=awesome_list.name,
                url=awesome_list.url,
                stars=repo.stars,
                description=repo.description,
            )
        )
    return ret


@st.cache_data
def all_awesome_lists_df() -> pd.DataFrame:
    # print("all_awesome_lists_df called")
    all_awe_lists = all_awesome_lists()
    df = pd.DataFrame([a.__dict__ for a in all_awe_lists])
    return df


@st.cache_data
def get_awesome_list_repos(url: str) -> list[ogm.Repo] | None:
    """
    Get all repos belongs to an Awesome List
    :param url: url is unique, name is not
    :return:
    """
    # print("get_awesome_list_repos called")
    a: ogm.AwesomeList | None = ogm.AwesomeList.nodes.get_or_none(url=url)
    # a: AwesomeList | None = AwesomeList.nodes.get_or_none(url=url)
    if a is None:
        return None
    return a.repos.all()


@st.cache_data
def get_total_awesome_lists_count():
    return len(ogm.AwesomeList.nodes)


@st.cache_data
def get_total_repos_count():
    return len(ogm.Repo.nodes)


@st.cache_data
def get_top_repos(top_n: int) -> list[Repo]:
    results = db.cypher_query(
        f"""
        MATCH (n:Repo) RETURN n ORDER BY n.stars DESC LIMIT {top_n};
        """,
        resolve_objects=True,
    )[0]
    # return results
    ret = []
    for item in results:
        ret.append(
            Repo(
                id=item[0].id,
                owner=item[0].owner,
                name=item[0].name,
                stars=item[0].stars,
                url=item[0].url,
                missing=item[0].missing,
                lastModified=item[0].lastModified,
                description=item[0].description,
                diskUsage=item[0].diskUsage,
                forkCount=item[0].forkCount,
                hasSponsorshipsEnabled=item[0].hasSponsorshipsEnabled,
                homepageUrl=item[0].homepageUrl,
                license=item[0].license,
                openIssuesCount=item[0].openIssuesCount,
                pullRequestsCount=item[0].pullRequestsCount,
                releasesCount=item[0].releasesCount,
                repoPushedAt=item[0].repoPushedAt,
                repoUpdatedAt=item[0].repoUpdatedAt,
                repoCreatedAt=item[0].repoCreatedAt,
                watchersCount=item[0].watchersCount,
                createdAt=item[0].createdAt,
            )
        )
    return ret

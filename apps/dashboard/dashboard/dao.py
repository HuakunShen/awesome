import pandas as pd
from dashboard.model import AwesomeListRepo
from neomodel import db
from packages.neo4jdb.pylib import ogm
import streamlit as st


# @st.cache_data
def all_awesome_lists() -> list[AwesomeListRepo]:
    print("all_awesome_lists called")
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

# @st.cache_data
def all_awesome_lists_df() -> pd.DataFrame:
    all_awe_lists = all_awesome_lists()
    df = pd.DataFrame([a.__dict__ for a in all_awe_lists])
    return df


# @st.cache_data
def get_awesome_list_repos(url: str) -> list[ogm.Repo] | None:
    """
    Get all repos belongs to an Awesome List
    :param url: url is unique, name is not
    :return:
    """
    a: ogm.AwesomeList | None = ogm.AwesomeList.nodes.get_or_none(url=url)
    # a: AwesomeList | None = AwesomeList.nodes.get_or_none(url=url)
    if a is None:
        return None
    return a.repos.all()

import streamlit as st
import pandas as pd
from dashboard import dao
import re


def render_all_awesome_list_repos_df():
    # All Awesome Lists
    df = dao.all_awesome_lists_df()
    df["awesome_list"] = f"/Repos?awesome-list=" + df["name"]
    df.rename(
        columns={
            "url": "URL",
            "name": "Name",
            "stars": "Stars",
            "description": "Description",
        },
        inplace=True,
    )
    df["Selected"] = False
    df = df[["Name", "Stars", "awesome_list", "Selected", "URL", "Description"]]
    edited_df = st.data_editor(
        df,
        column_config={
            "URL": st.column_config.LinkColumn(),
            "awesome_list": st.column_config.LinkColumn(
                "Awesome List",
                help="Video List of Awesome Projects",
                display_text="Explore",
            ),
            "Selected": st.column_config.CheckboxColumn(
                "Selected",
                help="Select Awesome List to View Repos",
                default=False,
            ),
        },
    )

    selected_awesome_lists = edited_df[edited_df["Selected"]]
    a_lists = (
        selected_awesome_lists[["Name", "URL"]]
        .rename(columns={"URL": "url", "Name": "name"})
        .to_dict("records")
    )
    if a_lists:
        st.markdown("## Selected Awesome Lists and their Repos")
        repos_df = render_awesome_list_repos(a_lists)
        repo_found_count_text = st.write(f"#### :red[{len(repos_df)}] Repos Found")


def render_top_100_repos():
    top_repos = dao.get_top_repos(100)
    df = pd.DataFrame([r.__dict__ for r in top_repos])
    df.drop(columns=["id"], inplace=True)

    # df columns are now in camel case, convert them to regular case, not only capitalize, but also separate words
    def camel_case_to_text(name):
        words = re.findall(r"[A-Z]?[a-z]+|[A-Z]+(?![a-z])", name)
        return " ".join(word.capitalize() for word in words)

    df.columns = [camel_case_to_text(col) for col in df.columns]

    st.dataframe(df)


def render_awesome_list_repos(awesome_lists: list[dict]) -> pd.DataFrame:
    """
    repos is expected to be a list of dict with keys: "name" and "url"
    """
    data = []
    for option in awesome_lists:
        for repo in dao.get_awesome_list_repos(option["url"]):
            data.append(
                {
                    "Name": repo.name,
                    "Stars": repo.stars,
                    "Star History": "/Repo_Star_History?repo_url=" + repo.url,
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

    if not data:
        st.stop()
    repos_df = pd.DataFrame(data)
    repos_df.sort_values(by="Stars", ascending=False, inplace=True)
    repos_df.reset_index(drop=True, inplace=True)
    # repos_df["Star History"] = "/Repo_Star_History?repo_url=" + repos_df["URL"]
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
    return repos_df

import streamlit as st
from dashboard import dao


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
    df = df[["Name", "Stars", "awesome_list", "Description", "URL"]]
    st.dataframe(
        df,
        column_config={
            "URL": st.column_config.LinkColumn(),
            "awesome_list": st.column_config.LinkColumn(
                "Awesome List",
                help="Video List of Awesome Projects",
                display_text="Explore",
            ),
        },
    )

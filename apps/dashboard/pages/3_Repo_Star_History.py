import re
import requests
from pprint import pp
import sys
import plotly.express as px
from dashboard.utils import repo_root

sys.path.append(str(repo_root))
import streamlit as st
import pandas as pd
import pydeck as pdk
from urllib.error import URLError
from dashboard import dao, api
import os
from neomodel import config

config.DATABASE_URL = os.getenv("NEO4J_DATABASE_URL")

st.set_page_config(page_title="Star History", page_icon="🌍")


# read from url param
default_value = "https://github.com/sindresorhus/awesome"
if "repo_url" in st.query_params:
    default_value = st.query_params["repo_url"]


text_input = st.text_input(
    "Enter Repo URL",
    value=default_value,
    placeholder="Enter GitHub Repo URL: https://github.com/<owner>/<repo>",
)
# parse owner and repo
# Use js regex /^https:\/\/github\.com\/([\w-]+)\/([\w-]+)(?:\/|#?.*)?$/ turn it into python

repo_regex = re.compile(r"^https:\/\/github\.com\/([\w-]+)\/([\w-]+)(?:\/|#?.*)?$")
match = repo_regex.match(text_input)
if match:
    owner, repo = match.groups()
    st.markdown(
        f"**Fetching star history for** `{owner}/{repo}`. It may take a while if it's the first time this repo is being indexed. Refresh in a few minutes."
    )
    # dates = api.fetch_star_dates(owner, repo)
    # fig = api.plot_star_history(dates)
    star_url = f"https://star-history.pockethost.io/star-history/{owner}/{repo}"
    res = requests.get(star_url)
    if not res.ok:
        st.error(
            f"Failed to fetch star history for {owner}/{repo}. It may be the first time this repo is being indexed. Come back in a few minutes."
        )
        st.stop()
    star_count = res.json()
    star_history_df = pd.DataFrame(star_count)
    if len(star_history_df) > 1000:
        # uniformly sample 1000 rows
        star_history_df = star_history_df.sample(n=100)
    print(star_history_df)
    # star_history_df.rename(columns={"date": "Date", "stars": "Stars"}, inplace=True)
    if len(star_history_df) == 0:
        st.error("No star history found for this repo.")
        st.stop()
    star_history_df.sort_values(by="date", inplace=True)
    star_history_df.rename(columns={"date": "Date", "stars": "Stars"}, inplace=True)
    st.plotly_chart(
        px.line(
            star_history_df,
            title=f"Star History for {owner}/{repo}",
            x="Date",
            y="Stars",
            markers=True,
        )
    )
    # st.dataframe(star_history_df)

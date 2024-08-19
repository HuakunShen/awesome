from pprint import pp
import sys
from dashboard.utils import repo_root

sys.path.append(str(repo_root))
import streamlit as st
import pandas as pd
import pydeck as pdk
from urllib.error import URLError
from dashboard import dao, snippets
import os
from neomodel import config

config.DATABASE_URL = os.getenv("NEO4J_DATABASE_URL")

from dashboard import dao, snippets

st.set_page_config(page_title="Repos", page_icon="🌍", layout="wide")

st.write("# Find Projects by Awesome List")

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
# repos: list[dict] = []
snippets.render_awesome_list_repos(options)

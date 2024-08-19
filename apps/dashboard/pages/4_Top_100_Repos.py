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

from dashboard import dao, snippets

st.set_page_config(page_title="Repos", page_icon="🌍", layout="wide")

st.write("# Top 100 Awesome Repos")
snippets.render_top_100_repos()

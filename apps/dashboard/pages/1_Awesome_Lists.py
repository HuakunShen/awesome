# from dotenv import load_dotenv
# load_dotenv()
import os
import streamlit as st
import time
import pandas as pd
import numpy as np
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parent.parent.parent.parent))

# from packages.neo4jdb.pylib.ogm import AwesomeList, Repo, AsyncAwesomeList
from dashboard import dao, snippets
from neomodel import config

config.DATABASE_URL = os.getenv("NEO4J_DATABASE_URL")


st.set_page_config(page_title="Awesome Lists", page_icon="📈", layout="wide")

st.markdown(
    """
# Awesome Lists
This page contains a list of popular awesome lists.
"""
)

snippets.render_all_awesome_list_repos_df()

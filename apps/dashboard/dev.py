from pprint import pp
import sys
from dashboard.utils import repo_root
from dotenv import load_dotenv

load_dotenv()
sys.path.append(str(repo_root))
from packages.neo4jdb.pylib import ogm
import streamlit as st
import pandas as pd
import pydeck as pdk
from urllib.error import URLError
from dashboard import dao
import os
from neomodel import config
config.DATABASE_URL = os.getenv("NEO4J_DATABASE_URL")

# repos = dao.get_awesome_list_repos("https://github.com/tauri-apps/awesome-tauri")

# print(repos)
# repos = dao.get_awesome_list_repos("https://github.com/vinta/awesome-python")
# print(repos)
# print(ogm.AwesomeList.nodes.get_or_none(url="https://github.com/vinta/awesome-python").repos.all())
# print(ogm.AwesomeList.nodes.get_or_none(name="awesome-vue").repos.all())
# print(dao.get_total_awesome_lists_count())
# print(dao.get_total_repos_count())
pp(dao.get_top_repos(100))
# print(len(dao.get_top_repos(100)))
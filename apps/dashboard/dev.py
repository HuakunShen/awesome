import sys
from dashboard.utils import repo_root

sys.path.append(str(repo_root))
from packages.neo4jdb.pylib import ogm
import streamlit as st
import pandas as pd
import pydeck as pdk
from urllib.error import URLError
from dashboard import dao

# repos = dao.get_awesome_list_repos("https://github.com/tauri-apps/awesome-tauri")

# print(repos)
# repos = dao.get_awesome_list_repos("https://github.com/vinta/awesome-python")
# print(repos)
# print(ogm.AwesomeList.nodes.get_or_none(url="https://github.com/vinta/awesome-python").repos.all())
print(ogm.AwesomeList.nodes.get_or_none(name="awesome-python"))
# print(ogm.AwesomeList.nodes.get_or_none(name="awesome-vue").repos.all())

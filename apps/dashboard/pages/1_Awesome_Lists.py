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

from packages.neo4jdb.pylib.ogm import AwesomeList, Repo, AsyncAwesomeList


st.set_page_config(page_title="Awesome Lists", page_icon="📈", layout="wide")

st.markdown("# Plotting Demo")
st.sidebar.header("Plotting Demo")

awesome_list_repos = AwesomeList.nodes.all()
awesome_list_df = pd.DataFrame([l.__dict__ for l in awesome_list_repos])
st.dataframe(awesome_list_df[["name", "url"]], width=1000, height=1000)

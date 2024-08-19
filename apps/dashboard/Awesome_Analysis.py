import os
from dotenv import load_dotenv

load_dotenv()
import streamlit as st
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parent.parent.parent))

from dashboard import dao, snippets
from neomodel import config

config.DATABASE_URL = os.getenv("NEO4J_DATABASE_URL")


st.set_page_config(
    page_title="Awesome",
)

st.write("# Find Awesome Projects")

st.write(
    """
There are plenty of awesome projects out there. 

There are a bunch of awesome lists for each topic on GitHub collecting these projects.
         
However, the quality of these lists and projects can vary. It's hard to find the best ones without opening each one of them.
This website is indexed the top awesome lists and their projects to help you find the best ones in a breeze.

You can sort projects by stars, forks, PRs, issue close rate and more. 
You can also check the star history of a project to see if it's still actively maintained.

This project is open sourced at https://github.com/HuakunShen/awesome.
If you find a missing topic and would like the awesome list to be indexed, please open an issue at the GitHub repository.
"""
)
st.write("## Quick Links")
st.page_link("pages/1_Awesome_Lists.py", label="1️⃣ View Awesome Lists")
st.page_link("pages/2_Repos.py", label="2️⃣ View Awesome Repos")
st.page_link("pages/3_Repo_Star_History.py", label="3️⃣ Check Repo Star History")
st.page_link("pages/4_Top_100_Repos.py", label="4️⃣ Top 100 Repos")

st.write(f"#### Indexed :red[**{dao.get_total_awesome_lists_count()}**] Awesome Lists")
st.write(f"#### Indexed :red[**{dao.get_total_repos_count()}**] Repos")


st.markdown("## Awesome Lists")

snippets.render_all_awesome_list_repos_df()

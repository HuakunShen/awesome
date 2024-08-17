from dotenv import load_dotenv

load_dotenv()
import streamlit as st

st.set_page_config(
    page_title="Awesome",
)

st.write("# Find Awesome Projects")

st.page_link("pages/1_Awesome_Lists.py", label="Awesome Lists")
st.page_link("pages/2_Repos.py", label="Awesome Repos")
st.page_link("pages/3_Repo_Star_History.py", label="Repo Star History")

import pandas as pd
import streamlit as st
import matplotlib.pyplot as plt
import requests
from datetime import datetime
import plotly.express as px


# @st.cache_data
def fetch_star_dates(owner: str, repo: str) -> list[datetime]:
    url = f"https://api.github.com/repos/{owner}/{repo}/stargazers"
    headers = {"Accept": "application/vnd.github.v3.star+json"}
    params = {"per_page": 100}
    star_dates = []
    page = 1
    while True:
        response = requests.get(url, headers=headers, params={**params, "page": page})
        data = response.json()
        if not data:
            break
        for star in data:
            star_dates.append(
                datetime.strptime(star["starred_at"], "%Y-%m-%dT%H:%M:%SZ")
            )
        page += 1
    print(f"{owner}/{repo} takes {page} pages to fetch")
    return star_dates


def plot_star_history(star_dates: list[datetime]):
    dates = [date.date() for date in star_dates]
    dates.sort()
    cumulative_counts = [dates.count(d) for d in dates]
    cumulative_sum = []
    total = 0
    for count in cumulative_counts:
        total += count
        cumulative_sum.append(total)
    star_history_df = pd.DataFrame({"Date": dates, "Stars": cumulative_sum})
    return px.line(star_history_df, x="Date", y="Stars")


    # fig = plt.figure(figsize=(10, 6))
    # plt.plot(dates, cumulative_sum, marker="o", color="blue")

    # # Add labels and title
    # plt.xlabel("Date")
    # plt.ylabel("Cumulative Count")
    # plt.title("Cumulative Distribution of Dates")
    # plt.grid(True)
    # return fig

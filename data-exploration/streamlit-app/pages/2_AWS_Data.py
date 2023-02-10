import pandas as pd
import streamlit as st
import requests
from bs4 import BeautifulSoup


st.title("AWS Data", anchor=None)
# st.text()
st.markdown("We use AWS to store some of our larger data files we work with in our notebooks or other projects. The files are stored in a public S3 bucket and can be accessed directly via URL. Select the file you are interested in from the dropdown menu below. Click the link to download the file.")
ckfolderxml = BeautifulSoup(requests.get("https://earthgenome-foodsecurity.s3.amazonaws.com").text, "xml")
egfolderxml = BeautifulSoup(requests.get("https://plotline-public-data.s3.us-east-2.amazonaws.com").text, "xml")

files = []
for contents in ckfolderxml.find_all("Contents"):
    key = contents.find("Key").text
    files.append(key)

# create a streamlit dropdown menu with the content of files
selected_file = st.selectbox("Select a file", files)
url = "https://earthgenome-foodsecurity.s3.amazonaws.com/" + selected_file

st.write("Filename: " + selected_file)
st.write("Download URL: " + url)
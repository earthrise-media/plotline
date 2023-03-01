import pandas as pd
import streamlit as st
import requests

st.title("Get Mapbox Stylesheet", anchor=None)
# st.text()
st.markdown("We often use Mapbox maps to visualize our data. When we can we try to make these styles publicly available. Although some of our data is added to the maps on page load, sometimes it's helpful to see the map's style sheet. Feel free to use this tool to look at the JSON stylesheet data for our public maps or use it as tool to look at yoru own. Pro tip, this is a great tool if you style a layer in Mapbox Studio and want to copy the JSON data to add via Mapbox GL JS.")

# streamlit text input

def get_stylesheet(style_url, key):
    
    if style_url == "":
        st.write("Please enter a Mapbox Style URL")
    elif key == "":
        st.write("Please enter a Mapbox access token")
    else:
        st.write("Live Map link: " + "https://api.mapbox.com/styles/v1/"+ style_url[16:]+".html?title=view&access_token="+ key +"&zoomwheel=true&fresh=true")
        stylesheet_url = "https://api.mapbox.com/styles/v1/" + style_url[16:] + "?access_token=" + key
        response = requests.get(stylesheet_url)
        if response.status_code == 200:
            data = response.json()
            st.write(data)
        else:
            st.write("Error retrieving data from API")


mb_style_url = st.text_input('Mapbox Style URL (copy this from the share menu of the map style)', '')
mb_key = st.text_input('Mapbox access token (Use a token from your account if the map style is public you will be able to access the stylesheet)', '')
testurl = "mapbox://styles/highestroad/clagdhi60000v14royyoi5w1m"

if st.button("Get Stylesheet"):
    get_stylesheet(mb_style_url, mb_key)
from flask import Flask, render_template, request, jsonify
import requests
import json

# Given latitude and longitude, returns a map of useful location information for those coords, including fips codes, county name, and state name
def coordToStateAndCountyConversion(lat, long):
    # Calling API with lat and long inputs
    url = f"https://geo.fcc.gov/api/census/area?lat={lat}&lon={long}"

    # Getting and storing data from API
    response = requests.get(url)
    data = response.json()


    # Putting data into a dictionary
    location_info = {}
    location_info["lat"] = data["input"]["lat"]
    location_info["long"] = data["input"]["lon"]
    location_info["state_fips"] = data["results"][0]["state_fips"]
    location_info["county_fips"] = data["results"][0]["county_fips"]
    location_info["state_name"] = data["results"][0]["state_name"]
    location_info["county_name"] = data["results"][0]["county_name"]
    location_info["state_abbr"] = data["results"][0]["state_code"]

    return json.dumps(location_info)

 

# Given a lat and long, will return the fips code of that location
def coord_to_fips(latitude, longitude):
    lat = latitude
    long = longitude
    # Calling API with lat and long inputs
    url = f"https://geo.fcc.gov/api/census/area?lat={lat}&lon={long}"

    # Getting and storing data from API
    response = requests.get(url)
    data = response.json()

    return data["results"][0]["county_fips"]
    
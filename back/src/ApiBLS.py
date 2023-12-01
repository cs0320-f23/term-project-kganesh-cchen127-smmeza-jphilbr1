from flask import Flask, render_template, request, jsonify
import requests
import json
from CoordToFips import *

API_KEY = "8e005747a44f4542965de8c1051a83f6"

# --------------- Generic Endpoint Function------------------------
# Enter a data_name (ex: unemployment rate) and the corresponding measure code 
#    (ex: 03), and it will return a return a response_map json for that type of 
#    data
def generic_bls_endpoint(data_name, measure_code):
    state_fips = request.args.get('state_fips')
    county_fips = request.args.get('county_fips')
    # EXAMPLE: http://127.0.0.1:5000/unemployment_rate?state_fips=01&county_fips=001
    # api_url = "https://api.bls.gov/publicAPI/v2/timeseries/data/LAUCN" + str(state_fips) + str(county_fips) + "00000000" + measure_code
    api_url = f"https://api.bls.gov/publicAPI/v2/timeseries/data/LAUCN{state_fips}{county_fips}00000000{measure_code}?latest=true&registrationkey={API_KEY}"
    print(api_url)

    # Making a GET request
    response = requests.get(api_url)    
    API_Data = response.json()

    if API_Data["status"] == "REQUEST_NOT_PROCESSED":
        return "error occurred: " + API_Data["status"]

    # Parsing API_Data for unemployment rate and storing it
    value = API_Data["Results"]["series"][0]["data"][0]["value"]
    message = "The " + data_name + " for FIPS code " + str(state_fips) + str(county_fips) + " is " + str(value)

    # Json that will be returned
    response_map = {
        "status": "success",
        data_name : value,
        "message": message
    }

    response_json = json.dumps(response_map)

    return response_json
    # return message
from flask import Flask, render_template, request, jsonify
import requests
import json
from .CoordToFips import *
from .CONSTANTS import *

# --------------- Generic Endpoint Function------------------------
# Enter a data_name (ex: unemployment rate) and the corresponding measure code 
#    (ex: 03), and it will return a return a response_map json for that type of 
#    data
def generic_bls_endpoint(data_name, measure_code, state_fips, county_fips):
    api_url = f"https://api.bls.gov/publicAPI/v2/timeseries/data/LAUCN{state_fips}{county_fips}00000000{measure_code}?latest=true&registrationkey={API_KEY}"
    # print(api_url)

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
        "message": message,
        "state_fips": state_fips,
        "county_fips": county_fips,
    }

    response_json = json.dumps(response_map)

    return response_json

# Given a full fips code (5 digits), will return a json of BLS employment by
# industry data for that location
def fips_to_industry_breakdown(fips_code):
    fips = fips_code

    api_url = 'https://api.bls.gov/publicAPI/v2/timeseries/data/'

    headers = {'Content-type': 'application/json'}


    # Gets employee counts in private firms across various industries
    payload = {
        "seriesid":
        [
            f"ENU{fips}1051011", 
            f"ENU{fips}1051012",
            f"ENU{fips}1051013",
            f"ENU{fips}1051021",
            f"ENU{fips}1051022",
            f"ENU{fips}1051023",
            f"ENU{fips}1051024",
            f"ENU{fips}1051025",
            f"ENU{fips}1051026",
            f"ENU{fips}1051027",
            # f"ENU{fips}10511" # AGRICULTURE
        ],
        "startyear":"2023", 
        "endyear":"2023",   
        "registrationkey":f"{API_KEY}"
    }

    data=json.dumps(payload)

    # Making a POST request
    response = requests.post(api_url, headers=headers, data=data)
    API_Data = response.json()


    if API_Data["status"] == "REQUEST_NOT_PROCESSED":
        response_map = {
            "status": "error",
            "message": "error occurred: " + API_Data["status"]
        }

        response_json = json.dumps(response_map)
        return response_json
    
    # Parsing API_Data for employment by industry and storing it
    value = {
        "employees_mining":API_Data["Results"]["series"][0]["data"][0]["value"],
        "employees_construction":API_Data["Results"]["series"][1]["data"][0]["value"],
        "employees_manufacturing":API_Data["Results"]["series"][2]["data"][0]["value"],
        "employees_tradetransportutilities":API_Data["Results"]["series"][3]["data"][0]["value"],
        "employees_information":API_Data["Results"]["series"][4]["data"][0]["value"],
        "employees_finance":API_Data["Results"]["series"][5]["data"][0]["value"],
        "employees_professionalservices":API_Data["Results"]["series"][6]["data"][0]["value"],
        "employees_educationandhealth":API_Data["Results"]["series"][7]["data"][0]["value"],
        "employees_leisureandhospitality":API_Data["Results"]["series"][8]["data"][0]["value"],
        "employees_otherservices":API_Data["Results"]["series"][9]["data"][0]["value"],
    }

    # Json that will be returned
    response_map = {
        "status": "success",
        "data" : value,
        "fips" : fips
    }

    # Returning json
    response_json = json.dumps(response_map)
    return response_json


# Sets up an enpoint to get lat and long and will return json of breakdown of 
# employment by industry for that location
def coords_industry_data_endpoint(lat, long):
    # Converting lat and long to fips code
    fips = coord_to_fips(lat, long)

    # Returning breakdown information
    return fips_to_industry_breakdown(fips)


# Given a var_name (ex: unemployment_rate) and a list of fips (len <=50), will 
# return a list of pairs, where each pair[0] is a fips code and pair[1] is its 
# corresponding value for var_name
def fips_to_data(var_name, fips_list):
    # ensuring list is not too large
    if len(fips_list) > 50:
        raise ValueError(f"List is too large: Length is {len(fips_list)} when it should be <=50")
    
    # Converting var_name to measure code
    var_name_to_measure_code = {
        "unemployment_rate": "03",
        "labor_force": "06",
        "unemployed": "04",
        "employed": "05"
    }
    measure_code = var_name_to_measure_code[var_name]

    
    # Initializing a list that will hold the series id's associatted with corresponding fips codes
    series_id_list = []

    # Iterating through fips_list, making its series_id, and appending that to series_id_list
    for fips in fips_list:
        series_id_list.append(f"LAUCN{fips}00000000{measure_code}")
    
    # Making API call
    api_url = 'https://api.bls.gov/publicAPI/v2/timeseries/data/'

    headers = {'Content-type': 'application/json'}

    payload = {
        "seriesid": series_id_list, # Series_id_list goes here
        "startyear":"2023", 
        "endyear":"2023",   
        "registrationkey":f"{API_KEY}"
    }

    data=json.dumps(payload)
    response = requests.post(api_url, headers=headers, data=data)

    # Data returned from the api call as a json
    API_Data = response.json()

    if API_Data["status"] == "REQUEST_NOT_PROCESSED":
        return "error occurred: " + API_Data["status"]

    # map getting returned
    value_table = []

    # Iterating through fips list and making pairs with fips and it's corresponding value
    for i in range(len(fips_list)):
        try:
            pair = [fips_list[i], API_Data["Results"]["series"][i]["data"][0]["value"]]
            value_table.append(pair)
        except:
            print(API_Data)

    # Returning values as a list of lists
    return value_table



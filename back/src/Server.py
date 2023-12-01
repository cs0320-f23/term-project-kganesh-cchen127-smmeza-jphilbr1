from flask import Flask, render_template, request, jsonify
import requests
import json


API_KEY = "8e005747a44f4542965de8c1051a83f6"

# Given latitude and longitude, returns a map of useful location information for those coords, including fips codes, county name, and state name
def coordToStateAndCountyConversion(lat, long):
    # Ex (Prov, RI): https://geo.fcc.gov/api/census/area?lat=41.8240&lon=-71.4128
    '''
    {"input":{"lat":41.824,"lon":-71.4128,"censusYear":"2020"},"results":[{"block_fips":"440070008003031","bbox":[-71.413399,41.823669,-71.412354,41.824448],"county_fips":"44007","county_name":"Providence County","state_fips":"44","state_code":"RI","state_name":"Rhode Island","block_pop_2020":3,"amt":"AMT001","bea":"BEA003","bta":"BTA364","cma":"CMA038","eag":"EAG701","ivm":"IVM038","mea":"MEA001","mta":"MTA008","pea":"PEA007","rea":"REA001","rpc":"RPC001","vpc":"VPC001"}]}
    '''
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
    location_info["state_name"] = data["results"][0]["county_name"]
    location_info["county_name"] = data["results"][0]["state_name"]
    location_info["state_abbr"] = data["results"][0]["state_code"]

    return location_info

# print(coordToStateAndCountyConversion(41.8240, -71.4128))

# -------------------- Beggning of Server Code --------------------------

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello World!"

# --------------- Generic Endpoint Function------------------------
# Enter a data_name (ex: unemployment rate) and the corresponding measure code 
#    (ex: 03), and it will return a return a response_map json for that type of 
#    data
def generic_endpoint(data_name, measure_code):
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

# --------------------- Endpoints -----------------------------------

# Unemployment Endpoint 
@app.route('/unemployment_rate')
def unemployment_rate_endpoint():
    return generic_endpoint("unemployment rate", "03")

# Labor Force Endpoint 
@app.route('/labor_force')
def lab_for_endpoint():
    return generic_endpoint("labor force", "06")

# Unemployment Endpoint 
@app.route('/unemployment')
def unemployment_endpoint():
    return generic_endpoint("unemployment", "04")

# Employment Endpoint 
@app.route('/employment')
def employment_endpoint():
    return generic_endpoint("enemployment", "05")


# ------------------ Old Code (kept if needed to revert back to) ------------------

# Old non-generic style if needed
'''
def unemployment_rate_endpoint():
    state_fips = request.args.get('state_fips')
    county_fips = request.args.get('county_fips')
    # EXAMPLE: http://127.0.0.1:5000/unemployment_rate?state_fips=01&county_fips=001
    api_url = "https://api.bls.gov/publicAPI/v2/timeseries/data/LAUCN" + str(state_fips) + str(county_fips) + "0000000003"
    print(api_url)

    # Making a GET request
    response = requests.get(api_url)    
    API_Data = response.json()

    # Parsing API_Data for unemployment rate and storing it
    unemployment_rate = API_Data["Results"]["series"][0]["data"][0]["value"]
    message = "The unemployment rate for FIPS code " + str(state_fips) + str(county_fips) + " is " + str(unemployment_rate) + "%"

    # Json that will be returned
    response_map = {
        "status": "success",
        "unemployment_rate": unemployment_rate,
        "message": message
    }

    response_json = json.dumps(response_map)

    return response_json
    # return message
'''





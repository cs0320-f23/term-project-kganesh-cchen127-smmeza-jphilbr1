from flask import Flask, render_template, request, jsonify
import requests
import json
from CoordToFips import *
from ApiBLS import *
from FullData import *

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello World!"

# --------------------- Endpoints -----------------------------------

# Full Data Endpoint 
@app.route('/full_data')
def full_data_endpoint():
    return full_data_retrieval()

# Coordinates to FIPS Code Endpoint
@app.route('/coord_to_fips')
def coord_to_fips_endpoint():
    return coordToStateAndCountyConversion()

# Unemployment Endpoint 
@app.route('/unemployment_rate')
def unemployment_rate_endpoint():
    return generic_bls_endpoint("unemployment rate", "03")

# Labor Force Endpoint 
@app.route('/labor_force')
def lab_for_endpoint():
    return generic_bls_endpoint("labor force", "06")

# Unemployment Endpoint 
@app.route('/unemployed')
def unemployment_endpoint():
    return generic_bls_endpoint("unemployed", "04")

# Employment Endpoint 
@app.route('/employed')
def employment_endpoint():
    return generic_bls_endpoint("employed", "05")

# Industry Employment Endpoint 
@app.route('/industry_employment')
def industry_employment_endpoint():
    return industry_endpoint()



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





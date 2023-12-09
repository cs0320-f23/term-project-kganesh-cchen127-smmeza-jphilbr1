from flask import Flask, render_template, request, jsonify
import requests
import json
from CoordToFips import *
from ApiBLS import *
from DeteailedRecs import detailed_data
from FullData import *
from Name_To_Coords import *
import sys


sys.path.insert(0, '../test')

from BLS_mocks import mock_function


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
    state_fips = request.args.get('state_fips')
    county_fips = request.args.get('county_fips')
    return generic_bls_endpoint("unemployment rate", "03", state_fips, county_fips)

# Labor Force Endpoint 
@app.route('/labor_force')
def lab_for_endpoint():
    state_fips = request.args.get('state_fips')
    county_fips = request.args.get('county_fips')
    return generic_bls_endpoint("labor force", "06", state_fips, county_fips)

# Unemployment Endpoint 
@app.route('/unemployed')
def unemployment_endpoint():
    state_fips = request.args.get('state_fips')
    county_fips = request.args.get('county_fips')
    return generic_bls_endpoint("unemployed", "04", state_fips, county_fips)

# Employment Endpoint 
@app.route('/employed')
def employment_endpoint():
    state_fips = request.args.get('state_fips')
    county_fips = request.args.get('county_fips')
    return generic_bls_endpoint("employed", "05", state_fips, county_fips)

# Industry Employment Endpoint 
@app.route('/industry_employment')
def industry_employment_endpoint():
    lat = request.args.get('latitude')
    long = request.args.get('longitude')
    return coords_industry_data_endpoint(lat, long)

# Detailed Data endpoint
@app.route('/detailed_data')
def detailed_data_endpoint():
    lat = request.args.get('latitude')
    long = request.args.get('longitude')
    return detailed_data(lat, long)



# Endpoint to get coordinate to zoom in on
@app.route('/zoom')
def zooming_endpoint():
    return zooming_function()


# -------------- Mock endpoint ---------
@app.route('/mock')
def mock():
    return mock_function()





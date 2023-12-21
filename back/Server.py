from flask import Flask, render_template, request, jsonify
import requests
import json
from src.production import *
from test import *
import sys
from flask_cors import CORS



app = Flask(__name__)
CORS(app, origins=["http://localhost:8000", "https://localhost:8000"])


@app.route('/')
def index():
    scheduler_run()
    return "Hello World!"

# --------------------- Primary Endpoints ---------------------------

# Full Data Endpoint 
@app.route('/full_data')
def full_data_endpoint():
    # Ensuring parameters are correct
    if len(request.args) != 0:
        response_map = {
            "status": "error",
            "message": "Incorrect parameters. Please ensure no parameters are entered"
        }
        return json.dumps(response_map)

    # Collecting parameters and calling endpoint function
    return full_data_retrieval()

# Detailed Data endpoint
@app.route('/detailed_data')
def detailed_data_endpoint():
    # Ensuring parameters are correct
    if ('latitude' not in request.args or 'longitude' not in request.args) or len(request.args) != 2:
        response_map = {
            "status": "error",
            "message": "Incorrect parameters. Please ensure the only parameters are 'latitude' and 'longitude'"
        }
        return json.dumps(response_map)

    # Collecting parameters and calling endpoint function
    lat = request.args.get('latitude')
    long = request.args.get('longitude')
    return detailed_data(lat, long)

# Endpoint to get coordinate to zoom in on
@app.route('/zoom')
def zooming_endpoint():
    # Ensuring parameters are correct
    if ('county' not in request.args or 'state' not in request.args) or len(request.args) != 2:
        response_map = {
            "status": "error",
            "message": "Incorrect parameters. Please ensure the only parameters are 'state' and 'county'"
        }
        return json.dumps(response_map)

    # Collecting parameters and calling endpoint function
    county = request.args.get('county')
    state = request.args.get('state')
    return zooming_function(county, state)

# Coordinates to FIPS Code Endpoint
@app.route('/coord_to_fips')
def coord_to_fips_endpoint():
    # Ensuring parameters are correct
    if ('lat' not in request.args or 'long' not in request.args) or len(request.args) != 2:
        response_map = {
            "status": "error",
            "message": "Incorrect parameters. Please ensure the only parameters are 'lat' and 'long'"
        }
        return json.dumps(response_map)

    # Collecting parameters and calling endpoint function
    lat = request.args.get('lat')
    long = request.args.get('long')
    return coordToStateAndCountyConversion(lat, long)


# -------------- Mock Endpoints --------------
@app.route('/mock')
def mock():
    # Ensuring parameters are correct
    if ('mock' not in request.args) or len(request.args) != 1:
        response_map = {
            "status": "error",
            "message": "Incorrect parameters. Please ensure the only parameter is 'data'"
        }
        return json.dumps(response_map)
    data = request.args.get("data")
    return mock_function(data)


# -------------- Testing (Deprecated) Endpoints ---------

@app.route('/test')
def test():
    fips = request.args.get("fips")
    return fips_to_industry_breakdown(fips)

# Unemployment Endpoint 
@app.route('/unemployment_rate')
def unemployment_rate_endpoint():
    # Ensuring parameters are correct
    if ('state_fips' not in request.args or 'county_fips' not in request.args) or len(request.args) != 2:
        response_map = {
            "status": "error",
            "message": "Incorrect parameters. Please ensure the only parameters are 'state_fips' and 'county_fips'"
        }
        return json.dumps(response_map)

    # Collecting parameters and calling endpoint function
    state_fips = request.args.get('state_fips')
    county_fips = request.args.get('county_fips')
    return generic_bls_endpoint("unemployment rate", "03", state_fips, county_fips)


# Labor Force Endpoint 
@app.route('/labor_force')
def lab_for_endpoint():
    # Ensuring parameters are correct
    if ('state_fips' not in request.args or 'county_fips' not in request.args) or len(request.args) != 2:
        response_map = {
            "status": "error",
            "message": "Incorrect parameters. Please ensure the only parameters are 'state_fips' and 'county_fips'"
        }
        return json.dumps(response_map)
    
    state_fips = request.args.get('state_fips')
    county_fips = request.args.get('county_fips')
    return generic_bls_endpoint("labor force", "06", state_fips, county_fips)


# Unemployment Endpoint 
@app.route('/unemployed')
def unemployment_endpoint():
    # Ensuring parameters are correct
    if ('state_fips' not in request.args or 'county_fips' not in request.args) or len(request.args) != 2:
        response_map = {
            "status": "error",
            "message": "Incorrect parameters. Please ensure the only parameters are 'state_fips' and 'county_fips'"
        }
        return json.dumps(response_map)
    
    # Collecting parameters and calling endpoint function
    state_fips = request.args.get('state_fips')
    county_fips = request.args.get('county_fips')
    return generic_bls_endpoint("unemployed", "04", state_fips, county_fips)


# Employment Endpoint 
@app.route('/employed')
def employment_endpoint():
    # Ensuring parameters are correct
    if ('state_fips' not in request.args or 'county_fips' not in request.args) or len(request.args) != 2:
        response_map = {
            "status": "error",
            "message": "Incorrect parameters. Please ensure the only parameters are 'state_fips' and 'county_fips'"
        }
        return json.dumps(response_map)
    
    # Collecting parameters and calling endpoint function
    state_fips = request.args.get('state_fips')
    county_fips = request.args.get('county_fips')
    return generic_bls_endpoint("employed", "05", state_fips, county_fips)


# Industry Employment Endpoint 
@app.route('/industry_employment')
def industry_employment_endpoint():
    # Ensuring parameters are correct
    if ('latitude' not in request.args or 'longitude' not in request.args) or len(request.args) != 2:
        response_map = {
            "status": "error",
            "message": "Incorrect parameters. Please ensure the only parameters are 'latitude' and 'longitude'"
        }
        return json.dumps(response_map)
    
    # Collecting parameters and calling endpoint function
    lat = request.args.get('latitude')
    long = request.args.get('longitude')
    return coords_industry_data_endpoint(lat, long)

from flask import Flask, render_template, request, jsonify
import requests


app = Flask(__name__)

@app.route('/')
def index():
    return "Hello World!"


@app.route('/test')
def hello():
    # Access query parameters using request.args
    name = request.args.get('name', 'Guest')
    return f'Hello, {name}!'

@app.route('/unemployment_rate')
def api():
    state_fips = request.args.get('state_fips')
    county_fips = request.args.get('county_fips')
    # EXAMPLE: http://127.0.0.1:5000/unemployment_rate?state_fips=01&county_fips=001
    api_url = "https://api.bls.gov/publicAPI/v2/timeseries/data/LAUCN" + str(state_fips) + str(county_fips) + "0000000003"
    print(api_url)
    # Making a GET request
    response = requests.get(api_url)    
    API_Data = response.json()
    return "The unemployment rate for FIPS code " + str(state_fips) + str(county_fips) + " is " + str(API_Data["Results"]["series"][0]["data"][0]["value"]) + "%"

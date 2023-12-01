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

@app.route('/api')
def api():
    # Replace 'https://api.example.com/endpoint' with the actual API endpoint you want to call
    api_url = 'https://api.bls.gov/publicAPI/v2/timeseries/data/LAUCN281070000000003'

    # Making a GET request
    response = requests.get(api_url)    

    return response.json()

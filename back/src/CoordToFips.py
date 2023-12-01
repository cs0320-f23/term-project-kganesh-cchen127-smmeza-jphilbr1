from flask import Flask, render_template, request, jsonify
import requests
import json

# TODO: Talk about inputs to this funciton. Should be make the function itself take in a lat and long param, or do it through a call to the server?

# Given latitude and longitude, returns a map of useful location information for those coords, including fips codes, county name, and state name
def coordToStateAndCountyConversion():
    # Ex (Prov, RI): https://geo.fcc.gov/api/census/area?lat=41.8240&lon=-71.4128
    lat = request.args.get('lat')
    long = request.args.get('long')
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
    location_info["state_name"] = data["results"][0]["state_name"]
    location_info["county_name"] = data["results"][0]["county_name"]
    location_info["state_abbr"] = data["results"][0]["state_code"]

    return location_info

# print(coordToStateAndCountyConversion(41.8240, -71.4128))
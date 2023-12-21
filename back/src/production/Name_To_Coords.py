import json
from .CONSTANTS import *
from flask import *
from flask_cors import CORS


# Gets county name from feature
def feature_to_county_name(feature):
    return feature["properties"]["NAME"]

# Gets state fips code from feature
def feature_to_state_fips(feature):
    return feature["properties"]["STATEFP"]

# Gets 1 coord pair from feature
def feature_to_first_coord(feature):
    if feature["geometry"]["type"] == "Polygon":
        return feature["geometry"]["coordinates"][0][0]
    else:
        return feature["geometry"]["coordinates"][0][0][0]
    
# Gets coordinate list from feature
def feature_to_coord_list(feature):
    if feature["geometry"]["type"] == "Polygon":
        return feature["geometry"]["coordinates"][0]
    else:
        return feature["geometry"]["coordinates"][0][0]

# Finds the central coordinate given a list of coordinates by summing all lat
# coords and summing all y coords, then returning their respective averages
def avg_coord(coord_list: list):
    # Initializing sum variables and length of list
    x_sum = 0
    y_sum = 0
    length = len(coord_list)

    # Summing total for x and y (lat and long)
    for coord in coord_list:
        x_sum += coord[0]
        y_sum += coord[1]

    # Returning average -- central point
    return [x_sum / length, y_sum / length]


# Gets state fips code from state name
def name_to_state_fips(state_name):
    # Checks if key exists
    if state_name in US_STATE_FIPS:
        return US_STATE_FIPS[state_name]
    else:
        raise ValueError("State not found. Please ensure state name is typed correctly with first letter capitalized")



# Create a function that iterates through the geojson and create list of [county name, fips code]
def st_fips_to_county_name_and_coord():
    # Loading data from geojson
    f = open('../back/data/all_county_geojson.json')
    data = json.load(f)
    f.close

    feature_list = data["features"]

    # Maps of {st_fips: [[county1, coord], [county2, coord], ...]}
    big_map = {}

    # Iterate through feature_list
    for feature in feature_list:
        center = avg_coord(feature_to_coord_list(feature))
        # Creating a pair of county name and a coord that represents it
        pair = [feature_to_county_name(feature), center]

        
        # Getting st_fips code
        st_fips = feature_to_state_fips(feature)

        # Adding pair to map
        if st_fips not in big_map.keys():
            big_map[st_fips] = [pair]
        else:
            big_map[st_fips].append(pair)

    # Writing data to name_to_coords file
    with open("../back/data/names_to_coords.json", "w") as fp:
        json.dump(big_map, fp)


# Given a county name and state, it will return a coordinate pair that 
# within that county (the coord will be near the center of the county)
def representative_coord(county_name, state_name):
    # Converting state name to state fips code
    st_fips = name_to_state_fips(state_name)

    # Loading in names_to_coords and converting into a json
    f = open('../back/data/names_to_coords.json')
    data = json.load(f)
    f.close
    important_map = data
    
    
    # Iterating through the counties in the given state to find given county
    for county in important_map[st_fips]:
        # Returning representing coord of county given
        if county[0].lower() == county_name.lower():
            return county[1]
    # raising error if no county is found in state
    raise ValueError("County not found.")


# Given a county and state, this will return a json containing a coordinate
# pair within the center of that county
def zooming_function(county, state):
    try:
        # Getting representative coord
        coord = representative_coord(county, state)

        # Json that will be returned
        response_map = {
            "status": "success",
            "data": coord,
            "county" : county,
            "state" : state
        }

        # Returning json
        response_json = json.dumps(response_map)
        return response_json
    
    # Catching error
    except ValueError as e:
        response_map = {
            "status": "error",
            "message": "Error was encounted. Please ensure that county and state name were spelled correctly. Also please ensure first letter of state is capitalized. For ex: 'county=Orange&state=California'"
        }
        return json.dumps(response_map)








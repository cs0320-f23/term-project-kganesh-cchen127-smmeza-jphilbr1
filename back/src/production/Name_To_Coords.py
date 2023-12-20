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

# Finds the central coordinate given a list of coordinates
def avg_coord(coord_list: list):
    x_sum = 0
    y_sum = 0
    length = len(coord_list)

    for coord in coord_list:
        x_sum += coord[0]
        y_sum += coord[1]

    return [x_sum / length, y_sum / length]



# # Gets list of coords from feature ----------> need to fix bc doesnt work with diff poly vs multiploy
# def feature_to_list_of_coords(feature):
#     return feature["geometry"]["coordinates"][0]

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
    f = open('../data/all_county_geojson.json')
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

    # return big_map

        with open("../data/names_to_coords.json", "w") as fp:
            json.dump(big_map, fp)

# st_fips_to_county_name_and_coord()
        
    # return big_map


def representative_coord(county_name, state_name):
    # Converting state name to state fips code
    st_fips = name_to_state_fips(state_name)

    # Generating dict of {st_fips: [[county1, coord], [county2, coord], ...]}
    # if not generated already
    f = open('../data/names_to_coords.json')
    data = json.load(f)
    f.close
    important_map = data # -------------> need to change because generated this time everytime (should only be once)
    
    
    # Iterating through the counties in the given state
    for county in important_map[st_fips]:
        # print(important_map[st_fips])
        # Returning first corner of polygon of given county, state
        if county[0].lower() == county_name.lower():
            return county[1]
    # raising error if no county is found in state
    raise ValueError("County not found.")

# print(representative_coord("Orange", "California"))
# print(representative_coord("Bristol", "Massachusetts"))

def zooming_function(county, state):
    try:
        # Ensuring parameters are correct
        # if ('county' not in request.args and 'state' not in request.args) or len(request.args) != 2:
        #     response_map = {
        #         "status": "error",
        #         "message": "Incorrect parameters. Please ensure the only parameters are 'county' and 'state'"
        #     }

        #     return json.dumps(response_map)

        # Parameters

        # Getting representative coord
        coord = representative_coord(county, state)


        # Json that will be returned
        response_map = {
            "status": "success",
            "data": coord,
            "county" : county,
            "state" : state
        }

        response_json = json.dumps(response_map)
        # response_json.headers.add('Access-Control-Allow-Origin', '*')
        return response_json
    
    except ValueError as e:
        response_map = {
            "status": "error",
            "message": "Error was encounted. Please ensure that county and state name were spelled correctly. Also please ensure first letter of state is capitalized. For ex: 'county=Orange&state=California'"
        }
        return json.dumps(response_map)








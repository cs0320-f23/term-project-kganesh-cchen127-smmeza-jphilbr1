import json
from CONSTANTS import *


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

# # Gets list of coords from feature ----------> need to fix bc doesnt work with diff poly vs multiploy
# def feature_to_list_of_coords(feature):
#     return feature["geometry"]["coordinates"][0]

# Gets state fips code from state name
def name_to_state_fips(state_name):
    return US_STATE_FIPS[state_name]



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
        # Creating a pair of county name and a coord that represents it
        pair = [feature_to_county_name(feature), feature_to_first_coord(feature)]
        
        # Getting st_fips code
        st_fips = feature_to_state_fips(feature)

        # Adding pair to map
        if st_fips not in big_map:
            big_map[st_fips] = [pair]
        else:
            big_map[st_fips].append(pair)

    return big_map


def representative_coord(county_name, state_name):
    # Converting state name to state fips code
    st_fips = name_to_state_fips(state_name)

    # Generating dict of {st_fips: [[county1, coord], [county2, coord], ...]}
    # if not generated already
    important_map = st_fips_to_county_name_and_coord() # -------------> need to change because generated this time everytime (should only be once)
    
    # Iterating through the counties in the given state
    for county in important_map[st_fips]:
        # Returning first corner of polygon of given county, state
        if county[0].lower() == county_name.lower():
            return county[1]
    # raising error if no county is found in state
    raise ValueError("County not found.")

print(representative_coord("Orange", "California"))
print(representative_coord("Bristol", "Massachusetts"))





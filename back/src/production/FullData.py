import json
import math
from .ApiBLS import * 


# Updates the all_county_geojson_with_data.json with updated BLS data via calls to BLS API
def update_geojson():
    # Loading in all_county_geojson data
    f = open('./data/all_county_geojson.json')
    data = json.load(f)
    f.close
    # List of all relevant data points
    variables = ["unemployment_rate", "labor_force", "unemployed", "employed"]

    # BLS API limits calls to 50 series at a time -- need to run this many API calls for each variable
    n_iter_needed = math.ceil(len(data["features"])/50)


    for var_name in variables:
        for i in range(n_iter_needed):
            print("VARIABLE: " + str(var_name) + " " + "BATCH NUMBER: " + str(i))
            county_list = []

            # if not at end of set of calls for variable list, add 50 calls to next batch. Otherwise, add any remaining.
            if i != n_iter_needed - 1:
                for j in range(50):
                    county_list.append(str(data["features"][50*i+j]["properties"]["STATEFP"])+str(data["features"][50*i+j]["properties"]["COUNTYFP"]))
            else:
                for j in range(int(math.floor((len(data["features"])/50-math.floor(len(data["features"])/50))*50))):
                    county_list.append(str(data["features"][50*i+j]["properties"]["STATEFP"])+str(data["features"][50*i+j]["properties"]["COUNTYFP"]))

            print("County List:")
            print(county_list)

            if len(county_list) > 50:
                raise ValueError("ERROR ON 36")
            retVal = fips_to_data(var_name, county_list)
            if len(retVal) > 50:
                raise ValueError("ERROR ON 39")
            
            print("retVal:")
            print(retVal)
            
            # update county GeoJSON with this newly-acquired economic variable
            for j in range(len(retVal)):
                data["features"][50*i+j]["properties"].update({var_name:retVal[j][1]})

    # Save new full file in directory
    with open("./data/all_county_geojson_with_data.json", "w") as fp:
        json.dump(data, fp)

    return data

# Returns contents of GEOJson file with all geo-tagged data
def full_data_retrieval():

    f = open('./data/all_county_geojson_with_data.json')
    data = json.load(f)
    f.close

    # Json that will be returned
    response_map = {
        "status": "success",
        "data" : data,
    }

    response_json = json.dumps(response_map)

    return response_json


# update_geojson()
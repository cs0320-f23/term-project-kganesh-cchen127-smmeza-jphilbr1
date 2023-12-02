import json
import math
from ApiBLS import * 

def update_geojson():
    f = open('../data/all_county_geojson.json')
    data = json.load(f)
    f.close

    variables = ["unemployment_rate", "labor_force", "unemployed", "employed"]

    n_iter_needed = math.ceil(len(data["features"])/50)
    for var_name in variables:
        for i in range(n_iter_needed):
            print("VARIABLE " + str(var_name) + " " + "BATCH NUMBER " + str(i))
            county_list = []
            if i != n_iter_needed - 1:
                for j in range(50):
                    county_list.append(str(data.features[50*i+j].properties.STATEFP)+str(data.features[50*i+j].properties.COUNTYFP))
            else:
                for j in range(int(math.floor((len(data["features"])/50-math.floor(len(data["features"])/50))*50))):
                    county_list.append(str(data["features"][50*i+j]["properties"]["STATEFP"])+str(data["features"][50*i+j]["properties"]["COUNTYFP"]))

            if len(county_list > 50):
                raise ValueError("ERROR ON 28")
            retVal = fips_to_data(var_name, county_list)
            if len(retVal > 50):
                raise ValueError("ERROR ON 31")
            
            for j in range(len(retVal)):
                data.features[50*i+j].properties.update({var_name:retVal[j][1]})


    with open("../data/all_county_geojson_with_data.json", "w") as outfile:
        outfile.write(data)

# Returns contents of GEOJson file with all geo-tagged data
def full_data_retrieval():

    f = open('../data/all_county_geojson_with_data.json')
    data = json.load(f)
    f.close

    # Json that will be returned
    response_map = {
        "status": "success",
        "data" : data,
    }

    response_json = json.dumps(response_map)

    return response_json

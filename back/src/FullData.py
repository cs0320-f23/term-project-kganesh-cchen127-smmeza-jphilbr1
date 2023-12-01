import json

# Returns contents of GEOJson file with all geo-tagged data
def full_data_retrieval():

    f = open('../data/all_county_geojson.json')
    data = json.load(f)
    f.close

    # Json that will be returned
    response_map = {
        "status": "success",
        "data" : data,
    }

    response_json = json.dumps(response_map)

    return response_json

import json
import csv

all_county_geojson_with_data = None
all_county_geojson = None
names_to_coords = None
us_county_latlng = None

def load_data_from_json(filepath):
    with open(filepath, "r") as file:
        data = json.load(file)
    return data

def load_data_from_csv(filepath):
    with open(filepath, "r") as file:
        reader = csv.DictReader(file)
        data = list(reader)
    return data

def define_data():
    all_county_geojson_with_data = load_data_from_json("./all_county_geojson_with_data.json")
    all_county_geojson = load_data_from_json("./all_county_geojson.json")
    names_to_coords = load_data_from_json("./names_to_coords.json")
    us_county_latlng = load_data_from_csv("./us_county_latlng.csv")

import json
from flask import Flask, render_template, request, jsonify
from .ApiBLS import *
from .CommodityRecs import *

from .CoordToFips import *

# coords --> fips --> uenmployment breakdown --> rec

# Given a lat and long coordinates, this will return a json of the location's
# fips code, employment breakdown, and recommendation
def detailed_data(lat, long):
    # Gettings fips, breakdown, and rec
    fips = coord_to_fips(lat, long)
    breakdown = fips_to_industry_breakdown(fips)
    rec = recommendCommodities(breakdown)

    # Converting into a map
    breakdown = json.loads(breakdown)
    rec = json.loads(rec)

    # Returning map
    return_json: json = {
        "lat": lat,
        "long": long,
        "fips": fips,
        "breakdown": breakdown,
        "rec": rec
    }
    return return_json
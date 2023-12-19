import json
from flask import Flask, render_template, request, jsonify
from .ApiBLS import *
from .CommodityRecs import *

from .CoordToFips import *

# coords --> fips --> uenmployment breakdown --> rec

def detailed_data(lat, long):
    fips = coord_to_fips(lat, long)
    breakdown = fips_to_industry_breakdown(fips)
    rec = recommendCommodities(breakdown)

    breakdown = json.loads(breakdown)
    rec = json.loads(rec)

    return_json: json = {
        "lat": lat,
        "long": long,
        "fips": fips,
        "breakdown": breakdown,
        "rec": rec
    }

    return return_json
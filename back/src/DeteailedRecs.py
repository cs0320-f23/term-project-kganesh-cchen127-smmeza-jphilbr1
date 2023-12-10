import json
from flask import Flask, render_template, request, jsonify
from ApiBLS import fips_to_industry_breakdown
from CommodityRecs import recommendCommodities

from CoordToFips import coord_to_fips

# coords --> fips --> uenmployment breakdown --> rec

def detailed_data(lat, long):
    fips = coord_to_fips(lat, long)
    breakdown = fips_to_industry_breakdown(fips)
    rec = recommendCommodities(breakdown)


    return_json: json = {
        "lat": lat,
        "long": long,
        "fips": fips,
        "breakdown": breakdown,
        "rec": rec
    }

    return return_json
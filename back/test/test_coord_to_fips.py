import unittest
import sys
import json

sys.path.insert(0, '../')
from src.production import *


class TestZoom(unittest.TestCase):

    # Tests coord_to_fips used in /coord_to_fips endpoint
    def test_coor_to_fips(self):

        # Testing for a Carroll County, NH
        res = json.loads(coordToStateAndCountyConversion("44", "-71"))
        self.assertEqual(res["lat"], 44)
        self.assertEqual(res["long"], -71)
        self.assertEqual(res["state_fips"], "33")
        self.assertEqual(res["county_fips"], "33003")
        self.assertEqual(res["state_name"], "New Hampshire")
        self.assertEqual(res["county_name"], "Carroll County")
        self.assertEqual(res["state_abbr"], "NH")

        # Testing for Suffolk County, MA
        res = json.loads(coordToStateAndCountyConversion("42.32", "-71.1"))
        self.assertEqual(float(res["lat"]), 42.32)
        self.assertEqual(float(res["long"]), -71.1)
        self.assertEqual(res["state_fips"], "25")
        self.assertEqual(res["county_fips"], "25025")
        self.assertEqual(res["state_name"], "Massachusetts")
        self.assertEqual(res["county_name"], "Suffolk County")
        self.assertEqual(res["state_abbr"], "MA")

        # Testing for San Mateo County, MA
        res = json.loads(coordToStateAndCountyConversion("37.68", "-122.41"))
        self.assertEqual(float(res["lat"]), 37.68)
        self.assertEqual(float(res["long"]), -122.41)
        self.assertEqual(res["state_fips"], "06")
        self.assertEqual(res["county_fips"], "06081")
        self.assertEqual(res["state_name"], "California")
        self.assertEqual(res["county_name"], "San Mateo County")
        self.assertEqual(res["state_abbr"], "CA")



if __name__ == '__main__':
    unittest.main()
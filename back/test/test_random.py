import unittest
import sys
import json
import random

sys.path.insert(0, '../')
from src.production import *


class TestRandom(unittest.TestCase):

    # Tests coord_to_fips used in /coord_to_fips endpoint
    def test_random(self):
        f = open('../data/all_county_geojson.json')
        data = json.load(f)
        f.close
        feature_list = data["features"]

        random_int_list = []
        for i in range(0,100):
            n = random.randint(0, len(feature_list) - 1)
            random_int_list.append(n)

        for random_int in random_int_list:
            properties = feature_list[random_int]["properties"]
            print("Random Testing: " + properties["NAME"] + " County")
            res = json.loads(generic_bls_endpoint("unemployment_rate", "03", properties["STATEFP"], properties["COUNTYFP"]))
            self.assertEqual(res["status"], "success")
            self.assertTrue(float(res["unemployment_rate"]) >= 0)
            self.assertEqual(res["state_fips"], properties["STATEFP"])
            self.assertEqual(res["county_fips"], properties["COUNTYFP"])
            self.assertTrue(len(res["message"]) > 0)
            print(properties["NAME"] + " County Passed")



if __name__ == '__main__':
    unittest.main()
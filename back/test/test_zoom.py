import unittest
import sys

sys.path.insert(0, '../src')

from ApiBLS import * 
from Name_To_Coords import *


class TestZoom(unittest.TestCase):

    def test_zoom(self):
        res = zooming_function("Orange", "California")


        self.assertEqual(float(res["data"][0]), -117.7946855071115)
        self.assertEqual(float(res["data"][1]), 33.67739249365285)
        self.assertEqual(res["state"], "California")
        self.assertEqual(res["status"], "success")
        self.assertEqual(res["county"], "orange")




        # res = coordToStateAndCountyConversion(41.8882, -71.4774)
        # self.assertEqual(float(res["lat"]), 41.8882)
        # self.assertEqual(float(res["long"]), -71.4774)
        # self.assertEqual(res["state_name"], "Rhode Island")
        # self.assertEqual(res["county_name"], "Providence County")
        # self.assertEqual(res["state_abbr"], "RI")
        # self.assertEqual(res["state_fips"], "44")
        # self.assertEqual(res["county_fips"], "44007")
        


if __name__ == '__main__':
    unittest.main()
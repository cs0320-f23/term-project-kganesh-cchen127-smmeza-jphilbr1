import unittest
import sys

sys.path.insert(0, '../')
from src.production import *


class TestGeoFCC(unittest.TestCase):

    def test_GeoFCC(self):
        res = coordToStateAndCountyConversion(32.5353, -86.6423)
        self.assertEqual(float(res["lat"]), 32.5353)
        self.assertEqual(float(res["long"]), -86.6423)
        self.assertEqual(res["state_name"], "Alabama")
        self.assertEqual(res["county_name"], "Autauga County")
        self.assertEqual(res["state_abbr"], "AL")
        self.assertEqual(res["state_fips"], "01")
        self.assertEqual(res["county_fips"], "01001")


        res = coordToStateAndCountyConversion(41.8882, -71.4774)
        self.assertEqual(float(res["lat"]), 41.8882)
        self.assertEqual(float(res["long"]), -71.4774)
        self.assertEqual(res["state_name"], "Rhode Island")
        self.assertEqual(res["county_name"], "Providence County")
        self.assertEqual(res["state_abbr"], "RI")
        self.assertEqual(res["state_fips"], "44")
        self.assertEqual(res["county_fips"], "44007")
        


if __name__ == '__main__':
    unittest.main()
import unittest
import sys
import json

sys.path.insert(0, '../')
from src.production import *


class TestZoom(unittest.TestCase):

    # Tests zooming_function used in /zoom endpoint
    def test_zoom(self):

        # Testing zoom results for Orange County, CA
        res = json.loads(zooming_function("Orange", "California"))

        self.assertEqual(float(res["data"][0]), -117.7946855071115)
        self.assertEqual(float(res["data"][1]), 33.67739249365285)
        self.assertEqual(res["state"], "California")
        self.assertEqual(res["status"], "success")
        self.assertEqual(res["county"], "Orange")


        # Testing zoom results for Bristol County, MA
        res = json.loads(zooming_function("bristol", "Massachusetts"))

        self.assertEqual(float(res["data"][0]), -71.05721508512947)
        self.assertEqual(float(res["data"][1]), 41.807466978661665)
        self.assertEqual(res["state"], "Massachusetts")
        self.assertEqual(res["status"], "success")
        self.assertEqual(res["county"], "bristol")

        # Testing zoom results for Maricopa County, AZ
        res = json.loads(zooming_function("maricopa", "Arizona"))

        self.assertEqual(float(res["data"][0]), -112.09782603225808)
        self.assertEqual(float(res["data"][1]), 33.4563373217125)
        self.assertEqual(res["state"], "Arizona")
        self.assertEqual(res["status"], "success")
        self.assertEqual(res["county"], "maricopa")

    # Testing inputs that lead to error in zoom function
    def test_zoom_error(self):
        # Testing when state is lower case
        res = json.loads(zooming_function("bristol", "massachusetts"))

        self.assertEqual(res["status"], "error")
        self.assertEqual(res["message"], "Error was encounted. Please ensure that county and state name were spelled correctly. Also please ensure first letter of state is capitalized. For ex: 'county=Orange&state=California'")

        # Testing when county does not exist
        res = json.loads(zooming_function("bad_county", "Massachusetts"))

        self.assertEqual(res["status"], "error")
        self.assertEqual(res["message"], "Error was encounted. Please ensure that county and state name were spelled correctly. Also please ensure first letter of state is capitalized. For ex: 'county=Orange&state=California'")


        


if __name__ == '__main__':
    unittest.main()
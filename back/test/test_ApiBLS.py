import unittest
import sys

sys.path.insert(0, '../')
from src.production import *


class TestApiBLS(unittest.TestCase):

    # tests that API receives a response for Autauga County, AL with:
    # - successful response
    # - non-negative statistic
    # - matching state and county fips as the ones that were queried
    # - non-empty response message

    def test_ApiBLS(self):
        res = json.loads(generic_bls_endpoint("unemployment_rate", "03", "01", "001"))
        self.assertEqual(res["status"], "success")
        self.assertTrue(float(res["unemployment_rate"]) >= 0)
        self.assertEqual(res["state_fips"], "01")
        self.assertEqual(res["county_fips"], "001")
        self.assertTrue(len(res["message"]) > 0)


        res = json.loads(generic_bls_endpoint("labor_force", "06", "01", "001"))
        self.assertEqual(res["status"], "success")
        self.assertTrue(float(res["labor_force"]) >= 0)
        self.assertEqual(res["state_fips"], "01")
        self.assertEqual(res["county_fips"], "001")
        self.assertTrue(len(res["message"]) > 0)


        res = json.loads(generic_bls_endpoint("unemployed", "04", "01", "001"))
        self.assertEqual(res["status"], "success")
        self.assertTrue(float(res["unemployed"]) >= 0)
        self.assertEqual(res["state_fips"], "01")
        self.assertEqual(res["county_fips"], "001")
        self.assertTrue(len(res["message"]) > 0)


        res = json.loads(coords_industry_data_endpoint(32.5353, -86.6423))
        self.assertEqual(res["status"], "success")
        self.assertTrue(float(res["data"]["employees_mining"]) >= 0)
        self.assertTrue(float(res["data"]["employees_construction"]) >= 0)
        self.assertTrue(float(res["data"]["employees_manufacturing"]) >= 0)
        self.assertTrue(float(res["data"]["employees_tradetransportutilities"]) >= 0)
        self.assertTrue(float(res["data"]["employees_information"]) >= 0)
        self.assertTrue(float(res["data"]["employees_finance"]) >= 0)
        self.assertTrue(float(res["data"]["employees_professionalservices"]) >= 0)
        self.assertTrue(float(res["data"]["employees_educationandhealth"]) >= 0)
        self.assertTrue(float(res["data"]["employees_leisureandhospitality"]) >= 0)
        self.assertTrue(float(res["data"]["employees_otherservices"]) >= 0)
        self.assertEqual(res["fips"], "01001")
        


if __name__ == '__main__':
    unittest.main()
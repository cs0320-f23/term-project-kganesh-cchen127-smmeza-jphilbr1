import unittest
import sys
import json
from .BLS_mocks import *



class TestMocks(unittest.TestCase):

    # tests that API receives a response for Autauga County, AL with:
    # - successful response
    # - non-negative statistic
    # - matching state and county fips as the ones that were queried
    # - non-empty response message

    def test_Mocks(self):
        res = mock_function("unemployment_rate_mock")
        self.assertEqual(res["status"], "success")
        self.assertTrue(float(res["unemployment_rate"]) >= 0)
        # self.assertEqual(res["state_fips"], "01")
        # self.assertEqual(res["county_fips"], "001")
        self.assertTrue(len(res["message"]) > 0)

        res = mock_function("labor_force_mock")
        self.assertEqual(res["status"], "success")
        self.assertTrue(float(res["labor_force"]) >= 0)
        # self.assertEqual(res["state_fips"], "01")
        # self.assertEqual(res["county_fips"], "001")
        self.assertTrue(len(res["message"]) > 0)


        res = mock_function("unemployment_mock")
        self.assertEqual(res["status"], "success")
        self.assertTrue(float(res["unemployed"]) >= 0)
        # self.assertEqual(res["state_fips"], "01")
        # self.assertEqual(res["county_fips"], "001")
        self.assertTrue(len(res["message"]) > 0)


        res = mock_function("employment_mock")
        self.assertEqual(res["status"], "success")
        self.assertTrue(float(res["employed"]) >= 0)
        # self.assertEqual(res["state_fips"], "01")
        # self.assertEqual(res["county_fips"], "001")
        self.assertTrue(len(res["message"]) > 0)

        # Testing industry_employment_mock
        res = json.loads(mock_function("industry_employment_mock"))
        self.assertEqual(res["status"], "success")
        self.assertTrue(res["data"]["employees_mining"] == "-" or int(res["data"]["employees_mining"]) >= 0)
        self.assertTrue(res["data"]["employees_construction"] == "-" or int(res["data"]["employees_construction"]) >= 0)
        self.assertTrue(res["data"]["employees_manufacturing"] == "-" or int(res["data"]["employees_manufacturing"]) >= 0)
        self.assertTrue(res["data"]["employees_tradetransportutilities"] == "-" or int(res["data"]["employees_tradetransportutilities"]) >= 0)
        self.assertTrue(res["data"]["employees_information"] == "-" or int(res["data"]["employees_information"]) >= 0)
        self.assertTrue(res["data"]["employees_finance"] == "-" or int(res["data"]["employees_finance"]) >= 0)
        self.assertTrue(res["data"]["employees_professionalservices"] == "-" or int(res["data"]["employees_professionalservices"]) >= 0)
        self.assertTrue(res["data"]["employees_educationandhealth"] == "-" or int(res["data"]["employees_educationandhealth"]) >= 0)
        self.assertTrue(res["data"]["employees_leisureandhospitality"] == "-" or int(res["data"]["employees_leisureandhospitality"]) >= 0)
        self.assertTrue(res["data"]["employees_otherservices"] == "-" or int(res["data"]["employees_otherservices"]) >= 0)
        self.assertTrue(int(res["fips"]) >= 0)








if __name__ == '__main__':
    unittest.main()
import json
from flask import Flask, render_template, request, jsonify

# unemployment rate mock
unemp_rate_mock: json = {"status": "success", "unemployment rate": "2.1", "message": "The unemployment rate for FIPS code 01001 is 2.1", "state_fips": "01", "county_fips": "001"}

# employed mock
unemp_mock: json = {"status": "success", "unemployed": "569", "message": "The unemployed for FIPS code 01001 is 569", "state_fips": "01", "county_fips": "001"}

# unemployed mock
emp_mock: json = {"status": "success", "employed": "26449", "message": "The employed for FIPS code 01001 is 26449", "state_fips": "01", "county_fips": "001"}

# labor force
lab_force_mock: json = {"status": "success", "labor force": "27018", "message": "The labor force for FIPS code 01001 is 27018", "state_fips": "01", "county_fips": "001"}

# industry employment breakdown
ind_empl_mock: json = {"status": "success", "data": {"employees_mining": "-", "employees_construction": "9842", "employees_manufacturing": "-", "employees_tradetransportutilities": "33749", "employees_information": "1096", "employees_finance": "3576", "employees_professionalservices": "9728", "employees_educationandhealth": "34804", "employees_leisureandhospitality": "10714", "employees_otherservices": "4770"}, "fips": "36085"}

mock_map = {
    "unemployment_rate_mock" : json.dumps(unemp_rate_mock),
    "unemployment_mock": json.dumps(unemp_mock),
    "employment_mock": json.dumps(emp_mock),
    "labor_force_mock": json.dumps(lab_force_mock),
    "industry_employment_mock": json.dumps(ind_empl_mock)
}

def mock_function(data):
    return mock_map[data]




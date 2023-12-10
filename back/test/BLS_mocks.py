import json
from flask import Flask, render_template, request, jsonify

# unemployment rate mock
unemp_rate_mock: json = {"status": "success", "unemployment rate": "2.1", "message": "The unemployment rate for FIPS code 01001 is 2.1"}

# employed mock
unemp_mock: json = {"status": "success", "unemployed": "569", "message": "The unemployed for FIPS code 01001 is 569"}

# unemployed mock
emp_mock: json = {"status": "success", "employed": "26449", "message": "The employed for FIPS code 01001 is 26449"}

# labor force
lab_force_mock: json = {"status": "success", "labor force": "27018", "message": "The labor force for FIPS code 01001 is 27018"}

# industry employment breakdown
ind_empl_mock: json = {"status": "success", "data": {"employees_mining": "178", "employees_construction": "729", "employees_manufacturing": "1534", "employees_tradetransportutilities": "2304", "employees_information": "40", "employees_finance": "484", "employees_professionalservices": "805", "employees_educationandhealth": "1276", "employees_leisureandhospitality": "1575", "employees_otherservices": "327"}}

mock_map = {
    "unemployment_rate_mock" : unemp_rate_mock,
    "unemployment_mock": unemp_mock,
    "employment_mock": emp_mock,
    "labor_force_mock": lab_force_mock,
    "industry_employment_mock": ind_empl_mock
}

def mock_function(data):
    return mock_map[data]




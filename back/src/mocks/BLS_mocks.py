import json

# unemployment rate mock
unemp_rate_mock: json = {"status": "success", "labor force": "27018", "message": "The labor force for FIPS code 01001 is 27018"}

# employed mock
unemp_mock: json = {"status": "success", "unemployed": "569", "message": "The unemployed for FIPS code 01001 is 569"}

# unemployed mock
emp_mock: json = {"status": "success", "employed": "26449", "message": "The employed for FIPS code 01001 is 26449"}

# labor force
lab_force_mock: json = {"status": "success", "labor force": "27018", "message": "The labor force for FIPS code 01001 is 27018"}

# industry employment breakdown
ind_empl_mock: json = {"status": "success", "data": {"employees_mining": "178", "employees_construction": "729", "employees_manufacturing": "1534", "employees_tradetransportutilities": "2304", "employees_information": "40", "employees_finance": "484", "employees_professionalservices": "805", "employees_educationandhealth": "1276", "employees_leisureandhospitality": "1575", "employees_otherservices": "327"}}
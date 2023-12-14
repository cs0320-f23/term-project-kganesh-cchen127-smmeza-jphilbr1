import json
from CONSTANTS import *

def importantIndustries(employees_mining: int, employees_construction: int, employees_manufacturing: int, employees_tradetransportutilities: int, employees_information: int, employees_finance: int, employees_professionalservices: int, employees_educationandhealth: int, employees_leisureandhospitality: int, employees_otherservices: int):
    employee_count_list = [employees_mining, employees_construction, employees_manufacturing, employees_tradetransportutilities, employees_information, employees_finance, employees_professionalservices, employees_educationandhealth, employees_leisureandhospitality, employees_otherservices]
    employed = sum(employee_count_list)
    important_industries_list = []

    for i in range(len(employee_count_list)):
        if (employee_count_list[i] / employed) >= 0.25:
            important_industries_list.append(INDUSTRY_LIST[i])
    
    return important_industries_list

def number_check(val):
    if val == "-":
        return 0
    else:
        return int(val)

def recommendCommodities(responseJson):
    print(responseJson)
    responseJson = json.loads(responseJson)
    employees_mining = responseJson["data"]["employees_mining"]
    employees_construction = responseJson["data"]["employees_construction"]
    employees_manufacturing = responseJson["data"]["employees_manufacturing"]
    employees_tradetransportutilities = responseJson["data"]["employees_tradetransportutilities"]
    employees_information = responseJson["data"]["employees_information"]
    employees_finance = responseJson["data"]["employees_finance"] 
    employees_professionalservices = responseJson["data"]["employees_professionalservices"]
    employees_educationandhealth = responseJson["data"]["employees_educationandhealth"]
    employees_leisureandhospitality = responseJson["data"]["employees_leisureandhospitality"]
    employees_otherservices = responseJson["data"]["employees_otherservices"]

    important_industries = importantIndustries(number_check(employees_mining), 
                                              number_check(employees_construction), 
                                              number_check(employees_manufacturing), 
                                              number_check(employees_tradetransportutilities), 
                                              number_check(employees_information), 
                                              number_check(employees_finance), 
                                              number_check(employees_professionalservices), 
                                              number_check(employees_educationandhealth), 
                                              number_check(employees_leisureandhospitality), 
                                              number_check(employees_otherservices))
    
    shorts = []
    longs = []
    
    for industry in important_industries:
        shorts.extend(TRADES_FOR_INDUSTRIES[industry]["inputs"])
        longs.extend(TRADES_FOR_INDUSTRIES[industry]["outputs"])
    

    data = {"shorts":shorts, "longs":longs}
    data = json.dumps(data)
    return data
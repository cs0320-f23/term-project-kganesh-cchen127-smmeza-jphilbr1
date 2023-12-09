from CONSTANTS import *

def recommendCommodities(employed: int, employees_mining: int, employees_construction: int, employees_manufacturing: int, employees_tradetransportutilities: int, employees_information: int, employees_finance: int, employees_professionalservices: int, employees_educationandhealth: int, employees_leisureandhospitality: int, employees_otherservices: int):
    employee_count_list = [employees_mining, employees_construction, employees_manufacturing, employees_tradetransportutilities, employees_information, employees_finance, employees_professionalservices, employees_educationandhealth, employees_leisureandhospitality, employees_otherservices]
    heavy_industries_list = []

    for i in range(len(employee_count_list)):
        if (employee_count_list[i] / employed) >= 0.25:
            heavy_industries_list.append(INDUSTRY_LIST[i])
    
    return heavy_industries_list
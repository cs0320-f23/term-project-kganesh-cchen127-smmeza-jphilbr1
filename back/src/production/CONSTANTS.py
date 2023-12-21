
API_KEY = "8e005747a44f4542965de8c1051a83f6" # Jay's API Key
# API_KEY = "464996beb3b343948b7f9f91fb3b7797" # Kylash's API Key

# Threshold we set to determine if an industry employment is significant
INDUSTRY_SIGNIFICANCE_THRESHOLD = 0.18

# List of industries
INDUSTRY_LIST = ["mining", "construction", "manufacturing", "tradetransportutilities", "information", "finance", "professionalservices", "educationandhealth", "leisureandhospitality", "otherservices"]

# Dict of U.S states to their corresponding state fips codes
US_STATE_FIPS = {
    'Alabama': '01',
    'Alaska': '02',
    'Arizona': '04',
    'Arkansas': '05',
    'California': '06',
    'Colorado': '08',
    'Connecticut': '09',
    'Delaware': '10',
    'Florida': '12',
    'Georgia': '13',
    'Hawaii': '15',
    'Idaho': '16',
    'Illinois': '17',
    'Indiana': '18',
    'Iowa': '19',
    'Kansas': '20',
    'Kentucky': '21',
    'Louisiana': '22',
    'Maine': '23',
    'Maryland': '24',
    'Massachusetts': '25',
    'Michigan': '26',
    'Minnesota': '27',
    'Mississippi': '28',
    'Missouri': '29',
    'Montana': '30',
    'Nebraska': '31',
    'Nevada': '32',
    'New Hampshire': '33',
    'New Jersey': '34',
    'New Mexico': '35',
    'New York': '36',
    'North Carolina': '37',
    'North Dakota': '38',
    'Ohio': '39',
    'Oklahoma': '40',
    'Oregon': '41',
    'Pennsylvania': '42',
    'Rhode Island': '44',
    'South Carolina': '45',
    'South Dakota': '46',
    'Tennessee': '47',
    'Texas': '48',
    'Utah': '49',
    'Vermont': '50',
    'Virginia': '51',
    'Washington': '53',
    'West Virginia': '54',
    'Wisconsin': '55',
    'Wyoming': '56'
}

# Data roughly sourced from: https://apps.bea.gov/iTable/?reqid=150&step=3&isuri=1&table_list=6007&categories=io&_gl=1*1a5u7rm*_ga*MjAyMTUyMTU3NC4xNzAyMTg2NzI5*_ga_J4698JNNFT*MTcwMjE4NjcyOC4xLjAuMTcwMjE4NjcyOC4wLjAuMA..#eyJhcHBpZCI6MTUwLCJzdGVwcyI6WzEsMiwzXSwiZGF0YSI6W1sidGFibGVfbGlzdCIsIjYwMTAiXSxbImNhdGVnb3JpZXMiLCJHZHB4SW5kIl1dfQ==
#   Lists of specific commodities here: https://en.wikipedia.org/wiki/List_of_traded_commodities
# AG: use a query like this https://api.bls.gov/publicAPI/v2/timeseries/data/ENU0100510511?annualaverage=true NEED ANNUAL AVERAGE!

# Dict of industries to their inputs and outputs
TRADES_FOR_INDUSTRIES  = {"mining":
                              {"inputs":["oil", "coal"], 
                               "outputs":[]}, 
                               "construction":
                              {"inputs":["timber", "copper", "interest_rates", "plastic", "propane"], 
                               "outputs":[""]}, 
                               "manufacturing": 
                               {"inputs":["molybdenum", "iron", "electricity", "steel", "aluminum"], 
                               "outputs":[]}, 
                               "tradetransportutilities": 
                               {"inputs":["gasoline", "steel", "rubber", "ethanol"], 
                               "outputs":["electricity"]}, 
                               "information": 
                               {"inputs":["copper", "silicon", "cobalt", "gold"], 
                               "outputs":[]}, 
                               "finance": 
                               {"inputs":["interest_rates", "electricity"], 
                               "outputs":[]}, 
                               "professionalservices": 
                               {"inputs":["interest_rates", "electricity"], 
                               "outputs":[]}, 
                               "educationandhealth": 
                               {"inputs":["propane", "electricity"], 
                               "outputs":[]}, 
                               "leisureandhospitality": 
                               {"inputs":["propane"], 
                               "outputs":[]}, 
                               "otherservices": 
                               {"inputs":[], 
                               "outputs":[]}}

'''
We want a way to go from "Count, ST" to coordinate"

1. Given county_name and state_name
2. Use map to go from county name to state fips
3. For each 

'''
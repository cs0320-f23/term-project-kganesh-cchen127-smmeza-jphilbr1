# term-project-kganesh-cchen127-smmeza-jphilbr1

## Team Members and Contributions

Connor Chen - cchen127

Kylash Ganesh - kganesh

Sydney Meza - smmeza

Jay Philbrick - jphilbr1

### Contributions:

Jay and Kylash developed the backend, Sydney and Connor developed the frontned.

### Total Estimated Time for Completion

28 hours each

## Repository Link

https://github.com/cs0320-f23/term-project-kganesh-cchen127-smmeza-jphilbr1

## Backend Deployment Link

https://csci-term-project-backend.onrender.com/

(remember to navigate to an appropriate endpoint, e.g. /full_data)

# Design Choices

We outline below our frontend and backend design choices.

## Frontend

Our frontend consists of an interactive Mapbox map and a command entry bar. The map is overlaid with redlining data and income data. Additionally, when a user types a string into the command entry bar, any geographies in the redlining data that contain this keyword are highlighted in dark purple on the map.

Each of the redlining data, income data, and search results are overlaid as Layers of the Mapbox map. 

The frontend server is hosted on Port 5173.

The webapp is structured as an App component, displaying a ControlledInput and a REPLInput component. Map Layers are contained in overlays.ts. 

## Backend

Server.py creates the Server, and has it listen on http://127.0.0.1:5000. It also calls the Handler functions in ApiBLS, CoordToFips, and other files as appropriate. 

ApiBLS.py implements a handler that calls the BLS API to pull industry employment data, as well as the simple data suite including unemployment rate, labor force size, unemployed persons, and employed persons for a given county or set of counties.

FullData.py calls functions from ApiBLS.py to update the full basic data file for all counties, and implements the handler that serves the file to the frontend.

Scheduler.py makes an update call to FullData.py every Sunday at 2 AM to fetch the lastest BLS data.

Name_To_Coords.py fetches county names and FIPS codes from the all_county_geojson.json file in order to generate a map from FIPS to county name, and also returns a representative coordinate to zoom to upon a frontend user searching for a given county. 

CommodityRecs.py contains the algorithm to recommend commodity longs and shorts based on industry employment counts and an I/O table contained in CONSTANTS.py

CONSTANTS.py contains important constants, including a list of state fips, the industry significance threshold for the commodity recommendation algorithm, the list of industries for which we have data, and an I/O table relating commodity inputs and outputs to each industry

CoordToFips.py sets up an endpoint to convert coordinates to state and county FIPS and names by accessing the FCC Geo API

DetailedRecs.py sets up an endpoint that returns industry employment data and commodity recommendations for a given county

## Data Structures

There are several primary data structures in our program.

### Frontend

### Backend

We store the industry list as a list. 

We store the map from state names to FIPS as a hashmap from string to string.

We store the map from industries to input and output commodities as a hashmap from string to hashmap from string to list. 

We store the full GeoJSON as a .json file

We store the full GeoJSON with basic economic data as a .json file

We store the map from counties to a representative coordinate as a .json file

We store a CSV mapping from US counties to longitude and latitude as a .csv file


# Errors/Bugs

We have no known errors or bugs at this time. 

# Tests

For our tests, we first tested basic expected responses of our program. Then we began to look at ways to give the program issues such as sending ill-formed commands, repeatedly loading files, repeatedly calling mode, etc.

We include both unit testing of single commands as well as integration testing of sets of commands, testing both on different shapes of data as well. 

# How To…

## Run the Program

### Frontend

The frontend server by navigating is started with the terminal command npm run dev. The backend server is started by opening back/src/main/java/edu/brown/cs/student/main/Server/Classes/Server.java in Intellij, then hitting run. 

From there, navigating to the URL http://localhost:5173/ loads the web interface. Commands can be issued into the text box provided by typing them, then clicking the submit button.

### Backend

In order to run the backend, navigate to the \term-project-kganesh-cchen127-smmeza-jphilbr1\back directory and run `python -m flask --app Server run`

Or, to see the deployed version, navigate to:

https://csci-term-project-backend.onrender.com/

Supported endpoints are:

#### full_data

Returns the full GeoJSON file with 4 basic economic variables.

Syntax:
`/full_data`

#### detailed_data

Returns industry employment and commodity holding recommendations for a specific county.

`/detailed_data?latitude={latitude}&longitude={longitude}`


#### zoom

Returns a representative coordiante for a particular coordinate.

`/zoom?county={county_name}&state={state_name}`


#### coord_to_fips

Converts from a latitude and longitude to a FIPS code and county information.

`/coord_to_fips?lat={latitude}&long={longitude}`


## Run the Tests

### Backend Python Unittest Tests

Change directory into ./test folder.

For each testing filename: `python -m unittest filename`

### Frontend Playwright Tests

To run tests: `npx playwright test`
To run tests in UI mode: `npx playwright test --ui`

### Frontend Jest Tests

To run tests: `npm run jest-w`

# Whose Labor

Acknowledgements -- we think the developers behind the following technologies:

Programming Languages:
1. Typescript
1. React
1. CSS
1. Java

IDEs/Compilers:
1. Visual Studio Code
1. IntelliJ

Packages:
1. Mapbox
1. Moshi
1. Spark
1. JUnit
1. Playwright

APIs:
1. Census API

# TODOs:
1. Double check data updating/timezone for updates
1. Testing
1. Return max values for Sydney
1. Frontend deployment
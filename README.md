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

Our frontend consists of an interactive Mapbox map, a command entry bar, a dropdown, multiple radio buttons, and a side bar that contains history and such. The map is overlaid with data received from the back end, the overlays can be switched between using the radiobuttons. A user can either click a certain county on the map or input 

The darkModeComponents folder contains the code for the dark mode toggle. 
- The Toggle file contains the information for a toggle component, which depends on the isDark and setIsDark. 
- The usecolorScheme file contains the code that switches isDark and setIsDark to actually make the changes to the webpage.

The functions folder contains differnet functions that are used in our other components of the webpage
- The CountyParse file uses different imports to parse a CSV file used for the Map
- The overlay file contains different data needed for each of the overlays that the map will use. It also contains a function that retrieves data from the backend to use for a few of the overlays
- stateAbbreviations contains a map for each state name and their abbreviation. It also contains a couple functions that converts each state to it's abbreviation or vice versa
- statesList contains a list of all the United States states

The Maps folder contains most of the components used for the map portion of our webapp
- ControlledInput is a wrapper class for an input bar and the dropdown to select a state.
- Mapbox contains most of the code for the functions that our map has. 
- MapsInfo contains most of the code that displays the data for a given county from the backend. It first retrieves the backend data using the accessUnemploymentData function. It then stores the data in two separate hashmaps. Each hashmap is then used in a function that sorts through the data to display. One hashmap is displayed in a bar chart, the other in two separate tables.
- RadioButton is a wrapper class for the radiobutton input. It also contains a function that is used to switch between each overlay of the map. 


The frontend server is hosted on Port 8000.

The webapp is structured as an App component, . Map Layers are contained in overlays.ts. 

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
We store the states and their abbreviations in a hashmap 

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

The frontend server by navigating is started with the terminal command npm run start. 

From there, navigating to the URL http://localhost:8000/ loads the web interface. 

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
1. Frontend deployment
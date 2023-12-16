# term-project-kganesh-cchen127-smmeza-jphilbr1

## Team Members and Contributions

Connor Chen - cchen127

Kylash Ganesh - kganesh

Sydney Meza - smmeza

Jay Philbrick - jphilbr1

### Contributions:

### Total Estimated Time for Completion

## Repository Link

https://github.com/cs0320-f23/term-project-kganesh-cchen127-smmeza-jphilbr1

# Design Choices

We outline below our frontend and backend design choices.

## Frontend

Our frontend consists of an interactive Mapbox map and a command entry bar. The map is overlaid with redlining data and income data. Additionally, when a user types a string into the command entry bar, any geographies in the redlining data that contain this keyword are highlighted in dark purple on the map.

Each of the redlining data, income data, and search results are overlaid as Layers of the Mapbox map. 

The frontend server is hosted on Port 5173.

The webapp is structured as an App component, displaying a ControlledInput and a REPLInput component. Map Layers are contained in overlays.ts. 

## Backend

The Server class creates the Server, and has it listen on Port 3232. It also calls the Handler functions in Parser, Viewer, Searcher, and for the Census to route requests appropriately. 

Parser implements a handler to load a CSV, placing its data in memory into an object that persists across loadcsv, viewcsv, and searchcsv. It takes parameters corresponding to the filepath of the data to load and whether or not the file has headers. The CSVDataSource Interface, implemented by the CSVData class, outlines getters and setters for CSV data. 

Viewer implements a handler that displays the contents (headers, if applicable, and data) of the previously parsed CSV file to users. 

Searcher implements a handler that searches through a previously parsed CSV file and prints the output for users. It takes parameters corresponding to the type of the search, (optionally) the column name or index to search by, and the keyword to search for.

CensusHandler implements a handler that calls the CensusAPI to pull broadband coverage data for a provided county and state and prints it to the user. The CensusDataSource Interface, implemented by the CensusData record, as well as the Geolocation record are used to represent different data types within CensusAPI. 

BroadbandHandler implements a handler that pulls all broadband data. GeoBroadbandHandler combines and returns this with GEOJson data. 

RedlineHandler implements a handler that pulls and returns redlining data given a bounding box. SearchReadline data returns redlining data given a search term to look up.

The DatasourceException class is thrown by handlers in response to specific errors. 

The CensusCache, partially written before being abandoned due to the project specifications changing, would be used to cache queried data from the CensusAPI to reduce calls to the CensusAPI. 

## Data Structures

There are several primary data structures in our program.

### Frontend

### Backend

We store a Map with both keys and values being strings to represent the correspondence between state names and state IDs from the CensusAPI. 

We store CensusData and Geolocations as records. 

We store CSV data as a List of String Lists and CSV headers as a List of Strings. 

# Errors/Bugs

We have no known errors or bugs at this time. 

# Tests

For our tests, we first tested basic expected responses of our program. Then we began to look at ways to give the program issues such as sending ill-formed commands, repeatedly loading files, repeatedly calling mode, etc.

We include both unit testing of single commands as well as integration testing of sets of commands, testing both on different shapes of data as well. 

# How To…

## Run the Program

The frontend server by navigating is started with the terminal command npm run dev. The backend server is started by opening back/src/main/java/edu/brown/cs/student/main/Server/Classes/Server.java in Intellij, then hitting run. 

From there, navigating to the URL http://localhost:5173/ loads the web interface. Commands can be issued into the text box provided by typing them, then clicking the submit button.

Supported commands are:

### search

Syntax: search_query

This searches the redlined data's area description variable for the given search_query, then overlays this data on the current map in dark purple. Entering any other search term replaces the current query. 

## Run the Tests

### Backend Tests

In IntelliJ, run any file in (or any file in any subfolder of):
maps-dlauerma-jphilbr1\back\src\test\java\edu\brown\cs\student\CSV
or in:
maps-dlauerma-jphilbr1\back\src\test\java\edu\brown\cs\student\Server
or in:

### Frontend Playwright Tests

To run tests: `npx playwright test`
To run tests in UI mode: `npx playwright test --ui`

### Frontend Jest Tests

To run tests: `npm run jest-w`

# Whose Labor

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

Acknowledgements:



TODOs:
1. Deployment!
1. Testing
1. Return max values for Sydney
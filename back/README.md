# Project Details
## Project Name
Server
## Team Members and Contributions

Ilan Brauns - ibrauns

Jay Philbrick - jphilbr1

### Contributions:

We both contributed roughly equally -- much of the code was written via CodeWithMe, allowing two developers to synchronously work on the same file. 

All code pushed on Sunday, 9/24, Thursday, 9/28, and Friday, 9/29, should in fact be marked as pair-programmed (since it was written in CodeWithMe together) -- not all of these pushes were marked as pair-programmed in error.

Jay wrote a greater portion of the CensusAPI, whereas Ilan wrote a greater portion of the CensusCache. All other modules were pair programmed.

### Total Estimated Time for Completion
13.5 hours each (10.5 hours simultaneously, 3 hours each apart)

## Repository Link
https://github.com/cs0320-f23/server-ilanbrauns-JayRPhilbrick

# Design Choices

We choose to have all user inputs as query parameters.

For the CensusAPI broadband data, we require users to enter full county and state names (we potentially could have used concatenation to make this simpler, but then it would fail for Louisiana and may not be robust to other state or territory naming conventions.)

## Relationships Between Classes/Interfaces

The Server class creates the Server, and has it listen on Port 3232. It also calls the Handler functions in Parser, Viewer, Searcher, and for the Census to route requests appropriately. 

Parser implements a handler to load a CSV, placing its data in memory into an object that persists across loadcsv, viewcsv, and searchcsv. It takes parameters corresponding to the filepath of the data to load and whether or not the file has headers. The CSVDataSource Interface, implemented by the CSVData class, outlines getters and setters for CSV data. 

Viewer implements a handler that displays the contents (headers, if applicable, and data) of the previously parsed CSV file to users. 

Searcher implements a handler that searches through a previously parsed CSV file and prints the output for users. It takes parameters corresponding to the type of the search, (optionally) the column name or index to search by, and the keyword to search for.

CensusHandler implements a handler that calls the CensusAPI to pull broadband coverage data for a provided county and state and prints it to the user. The CensusDataSource Interface, implemented by the CensusData record, as well as the Geolocation record are used to represent different data types within CensusAPI. 

The DatasourceException class is thrown by handlers in response to specific errors. 

The CensusCache, partially written before being abandoned due to the project specifications changing, would be used to cache queried data from the CensusAPI to reduce calls to the CensusAPI. 

## Data Structures
We store a Map with both keys and values being strings to represent the correspondence between state names and state IDs from the CensusAPI. 

We store CensusData and Geolocations as records. 

We store CSV data as a List of String Lists and CSV headers as a List of Strings. 

## Runtime/Space Optimizations You Made

For a user taking advantage of the Searching for Broadband Coverage in a Given U.S. State and County functionality, the first step is converting a user's STATE string into the State ID used by the Census API. Rather than repeating queries to the list of state names and state IDs each time a user requests a broadband value in a new state, we store this information for the life of the server. We store this as a HashMap from State Names to State IDs. 

# Errors/Bugs
No known bugs. 

# Tests

We test the CSV Parser, mock broadband requests, actual broadband requests, and the Census API. 

# How To…
## Run the Tests You Wrote/Were Provided

In order to run the tests we wrote, a user should open the project in IntelliJ, and run each of the files located in the Tests folder, including TestCensusAPI.java, TestCensusHandler.java, and TestParser.java. 

## Build and Run Your Program

Our program supports 4 functionalities: 

1. Loading local CSV files
2. Viewing local CSV files
3. Searching local CSV files
4. Searching for broadband coverage in a given U.S. state and county

NOTE: To support Viewing or Searching local CSV files, a file must first be loaded.

To run any of the 4 functionalities, navigate to Server.java and run Server.java from IntelliJ. From there, enter the appropriate query, as detailed below, into the URL bar of your Internet browser of choice (e.g. Google Chrome, Microsoft Edge, Safari, etc.). 

### Loading Local CSV Files

Loading a CSV places its contents, and headers if applicable, in memory, parsing the CSV's data into a List of String Lists and the headers into a List of Strings. Loading a CSV enables the CSV to be viewed or searched.

Loading a CSV requires two arguments: a filepath to a CSV file and a boolean that is "true" if the file contains headers (its first row corrsponds to column names) and "false" if the file does not contain headers. We use the path from content root for the filepath. Only CSVs in the $ROOT/data folder can be loaded to promote security. The general URL format for loading with filepath FILEPATH and headers boolean HEADERS is: 

http://localhost:3232/loadcsv?filepath=FILEPATH.csv&headers=HEADERS

In order to load, for example, a CSV with filepath: data/census/dol_ri_earnings_disparity.csv and headers, a user should open up their internet browser and type in the URL:

http://localhost:3232/loadcsv?filepath=data/census/dol_ri_earnings_disparity.csv&headers=true

In order to load, for example, a CSV with filepath: data/census/dol_ri_earnings_disparity.csv and no headers, a user should open up their internet browser and type in the URL:

http://localhost:3232/loadcsv?filepath=data/census/dol_ri_earnings_disparity.csv&headers=false

Only one CSV can be loaded at a time: calls to loadcsv overwrite previous calls.

### View Local CSV Files

Viewing a CSV displays a previously loaded CSV's data contents and headers, if the loaded CSV has headrs, in a JSON format in a web browser. One field contains the headers, if the CSV has headers, and another field contains the data. Data is listed as a List of String Lists, where each sublist represents a row in the CSV. The URL format for viewing a CSV is:

http://localhost:3232/viewcsv

### Searching Local CSV Files

There are three ways to search a loaded CSV for a given keyword: 

0: Search all columns for instances of a keyword.
1: Search a single column specified by column index
2: Search a single column specified by column name (REQUIRES LOADED DATA TO HAVE HEADERS)

Each search returns all rows that contain that keyword in either all columns (type 0 search) or one column (type 1 and 2 search)

0: 

search_type: 0
keyword: the keyword to search ALL columns for

EXAMPLE:
http://localhost:3232/searchcsv?keyword=RI&search_type=0

1: 

search_type: 1
col_index: the column index to be searched
keyword: the keyword for search ONE column with specified column index in

EXAMPLE:
http://localhost:3232/searchcsv?keyword=RI&col_index=0&search_type=1

2:

search_type: 2
col_name: the column header name to be searched
keyword: the keyword for search ONE column with specified column name in

EXAMPLE:
http://localhost:3232/searchcsv?keyword=RI&col_name=race&search_type=2

### Searching for Broadband Coverage in a Given U.S. State and County

This server also supports returning the percent of households in a given U.S. state and county that have access to broadband. The program queries the American Community Survey (ACS) 1-Year API for a given state and county, returning the value of the S2802_C03_022E variable, the "Estimate!!Percent Broadband Internet Subscription!!With a computer!!Total population in households!!EMPLOYMENT STATUS!!Civilian population 16 years and over!!Not in labor force" if that county is present in the ACS 1-Year Data. Counties with a population below 65,000 are suppressed for data privacy reasons, so the variable is not returned for them. 

In order to query a given STATE and COUNTY, the following URL should be typed into the URL bar of an internet browser:  

http://localhost:3232/broadband?state=STATE&county=COUNTY

Note that the COUNTY value must be the full name of a county. For example, to retrieve the broadband value for Kings County, California, STATE is California and COUNTY is Kings County, California, as displayed below:

http://localhost:3232/broadband?state=California&county=Kings%20County,%20California

Louisiana refers to its county-equivalents as Parishes, so, for example:

http://localhost:3232/broadband?state=Louisiana&county=Jefferson%20Parish,%20Louisiana

Depending on the choice of browser, each space may need to be replaced with %20.

# API Key
d9ab70f1962723dec8d9c8a8ffde26a35fe97524
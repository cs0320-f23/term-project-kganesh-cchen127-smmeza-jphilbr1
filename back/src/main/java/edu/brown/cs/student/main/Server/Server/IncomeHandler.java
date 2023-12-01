package edu.brown.cs.student.main.Server.Server;

import edu.brown.cs.student.main.server.census.CensusDataSource;
import edu.brown.cs.student.main.server.census.CensusDataSourceException;
import edu.brown.cs.student.main.server.county_geography.CountyGeographyDataSource;
import edu.brown.cs.student.main.server.county_geography.CountyGeographyDataSourceException;
import edu.brown.cs.student.main.server.requests.RequestException;
import edu.brown.cs.student.main.server.requests.ResponseRecord;
import edu.brown.cs.student.main.utils.Pair;
import spark.Request;
import spark.Response;
import spark.Route;

/** Handler for the broadband endpoint */
public class IncomeHandler implements Route {

  /* dataSource to call on to get data (used for mocking as well) */
  private final CensusDataSource censusDataSource;
  private final CountyGeographyDataSource geographyDataSource;

  /**
   * Default constructor for BroadbandHandler
   *
   * @param censusDataSource data source for census API to supply to handler
   * @param geographyDataSource data source for geography API to supply to handler
   */
  public IncomeHandler(
      CensusDataSource censusDataSource, CountyGeographyDataSource geographyDataSource) {
    this.censusDataSource = censusDataSource;
    this.geographyDataSource = geographyDataSource;
  }

  /**
   * Handles queries to broadband endpoint
   *
   * @param request the request from the client
   * @param response the response from the server
   * @return a JSON string containing the result of the query on the census API
   */
  @Override
  public String handle(Request request, Response response) {
    Pair<String, String> stateAndCounty;
    double longitude = 0;
    double latitude = 0;

    try {
      longitude = Double.parseDouble(request.queryParams("longitude"));
      latitude = Double.parseDouble(request.queryParams("latitude"));

      stateAndCounty = geographyDataSource.getStateAndCounty(longitude, latitude);
    } catch (CountyGeographyDataSourceException e) {
      return new ResponseRecord<>(
          new StateCountyHandler.StateCountyResponse(
              e.getCause()
                  .getMessage()
                  .equals("Could not find state or county name at given point")
                  ? "error_no_state_county_at_loc"
                  : "error_geography_data",
              null,
              null,
              longitude,
              latitude),
          StateCountyHandler.StateCountyResponse.class)
          .serialize(); // wrap exception
    }

    String state = null;
    String county = null;

    try {
      state = stateAndCounty.first();
      county = stateAndCounty.second();

      String broadbandData =
          censusDataSource.getCensusData(stateAndCounty.first(), stateAndCounty.second());

      return new ResponseRecord<>(
          new BroadbandResponse("success", broadbandData, state, county),
          BroadbandResponse.class)
          .serialize();
    } catch (CensusDataSourceException e) {
      if (e.getCause().getClass().equals(RequestException.class)) {
        return new ResponseRecord<>(
            new BroadbandResponse("error_census_data", null, state, county),
            BroadbandResponse.class)
            .serialize(); // wrap exception
      }

      // includes IllegalArgumentException, which is thrown on bad state/county names
      return new ResponseRecord<>(
          new BroadbandResponse("error_bad_request", null, state, county),
          BroadbandResponse.class)
          .serialize(); // wrap exception
    }
  }

  /**
   * A record for a Broadband response
   *
   * @param result the result of the query
   * @param data the data returned by the query
   * @param state the state queried by client
   * @param county the county queried by client
   */
  public record BroadbandResponse(String result, String data, String state, String county) {}
}

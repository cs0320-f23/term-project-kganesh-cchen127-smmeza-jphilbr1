package edu.brown.cs.student.main.server.county_geography;

import com.squareup.moshi.Types;
import edu.brown.cs.student.main.server.requests.RequestHandler;
import edu.brown.cs.student.main.utils.Pair;
import java.lang.reflect.ParameterizedType;
import java.util.Map;

/** Class that represents a FCC data source. */
public class FCCDataSource extends CountyGeographyDataSource {
  /* Type of the response from the API to be used with Moshi. */
  private static final ParameterizedType PARSE_TYPE =
      Types.newParameterizedType(Map.class, String.class, String.class);

  /**
   * Gets the state and county at a given coordinate using the FCC API.
   *
   * @param longitude the longitude of the coordinate
   * @param latitude the latitude of the coordinate
   * @return the given state and county at that coordinate
   * @throws CountyGeographyDataSourceException if there is an error getting the data
   */
  @Override
  public Pair<String, String> getStateAndCounty(double longitude, double latitude)
      throws CountyGeographyDataSourceException {
    try {
      String url = "https://geo.fcc.gov/api/census/area?lat=" + latitude + "&lon=" + longitude;
      String data = RequestHandler.sendRequestRaw(url);

      String stateDelimiter = "\"state_name\":";
      String countyDelimiter = "\"county_name\":";

      int stateNameIndex = data.indexOf(stateDelimiter);
      int countyNameIndex = data.indexOf(countyDelimiter);

      if (stateNameIndex < 0 || countyNameIndex < 0) {
        throw new CountyGeographyDataSourceException(
            new RuntimeException("Could not find state or county name at given point"));
      }

      // both of these will start after the first quotation mark
      String postStateDelimiter = data.substring(stateNameIndex + stateDelimiter.length() + 1);
      String postCountyDelimiter = data.substring(countyNameIndex + countyDelimiter.length() + 1);

      int stateSize = postStateDelimiter.indexOf("\"");
      int countySize = postCountyDelimiter.indexOf("\"");

      String stateName = postStateDelimiter.substring(0, stateSize);
      String countyName = postCountyDelimiter.substring(0, countySize);

      return new Pair<>(stateName, countyName);
    } catch (Exception e) {
      throw new CountyGeographyDataSourceException(e);
    }
  }
}

package edu.brown.cs.student.main.Server.Server;

import com.squareup.moshi.Types;
import edu.brown.cs.student.main.server.requests.RequestException;
import edu.brown.cs.student.main.server.requests.RequestHandler;
import java.lang.reflect.ParameterizedType;
import java.util.HashMap;
import java.util.List;

/** Class that handles actualy requests to the ACS API. */
public class ACSIncomeDataSource extends CensusDataSource {

  /** Type of the response from the API to be used with Moshi. */
  private static final ParameterizedType PARSE_TYPE =
      Types.newParameterizedType(List.class, List.class, String.class);

  /**
   * Constructor for ACSDataSource
   *
   * @throws CensusDataSourceException if there is an error with the census data source
   */
  public ACSIncomeDataSource() throws CensusDataSourceException {
    super();
  }

  /**
   * Sends a request to the API for a given url.
   *
   * @param url the url to send the request to
   * @return the response from the API as a list of lists of strings
   * @throws RequestException if there is an error with the request
   */
  private List<List<String>> sendAPIRequest(String url) throws RequestException {
    RequestHandler<List<List<String>>> request = new RequestHandler<>(ACSIncomeDataSource.PARSE_TYPE);
    return request.sendRequest(url);
  }

  /**
   * Populates the state codes map with the state names and their corresponding state numbers.
   *
   * @throws CensusDataSourceException if there is an error with the census data source
   */
  @Override
  protected void populateStateCodes() throws CensusDataSourceException {
    try {
      String url = "https://api.census.gov/data/2010/dec/sf1?get=NAME&for=state:*";
      List<List<String>> data = sendAPIRequest(url);

      for (int i = 1; i < data.size(); i++) {
        List<String> line = data.get(i);

        String stateName = line.get(0);
        String stateNumber = line.get(1);

        this.stateCodes.put(stateName, stateNumber);
        this.stateNumberToCountyCodes.put(stateNumber, new HashMap<>());
      }
    } catch (Exception e) {
      throw new CensusDataSourceException(e);
    }
  }

  /**
   * Populates the county codes map for a given state with the county names and corresponding codes.
   *
   * @param state the state to populate the county codes for
   * @throws CensusDataSourceException if there is an error with the census data source
   */
  @Override
  protected void populateCountyCodesForState(String state) throws CensusDataSourceException {
    try {
      String stateNumber = stateCodes.get(state);
      String url =
          "https://api.census.gov/data/2010/dec/sf1?get=NAME&for=county:*&in=state:" + stateNumber;
      List<List<String>> data = sendAPIRequest(url);

      for (int i = 1; i < data.size(); i++) {
        List<String> line = data.get(i);

        String countyName = line.get(0);
        String countyNumber = line.get(2);

        int firstComma = countyName.indexOf(",");
        countyName = countyName.substring(0, firstComma);
        this.stateNumberToCountyCodes.get(stateNumber).put(countyName, countyNumber);
      }
    } catch (Exception e) {
      throw new CensusDataSourceException(e);
    }
  }

  /**
   * Gets the census data for a given state and county.
   *
   * @param state the state to get census data for
   * @param county the county to get census data for
   * @return the census data for the given state and county
   * @throws CensusDataSourceException if there is an error with the census data source
   */
  @Override
  public String getCensusData(String state, String county) throws CensusDataSourceException {
    try {
      if (state == null || county == null) {
        throw new IllegalArgumentException("State or county cannot be null!");
      }

      String stateNumber = stateCodes.get(state);
      if (stateNumber == null) {
        throw new IllegalArgumentException("State does not exist!");
      }

      if (stateNumberToCountyCodes.get(stateNumber).isEmpty()) {
        populateCountyCodesForState(state);
      }

      if (!stateNumberToCountyCodes.get(stateNumber).containsKey(county)) {
        throw new IllegalArgumentException("County does not exist!");
      }

      String countyNumber = stateNumberToCountyCodes.get(stateNumber).get(county);
      String url =
          "https://api.census.gov/data/2021/acs/acs1/subject/variables?get=NAME,S2802_C03_022E&for=county:"
              + countyNumber
              + "&in=state:"
              + stateNumber;
      List<List<String>> data = sendAPIRequest(url);

      List<String> outputRow = data.get(1);

      return outputRow.get(1);

    } catch (Exception e) {
      throw new CensusDataSourceException(e);
    }
  }
}

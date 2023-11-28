package edu.brown.cs.student.main.Server.Classes;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import edu.brown.cs.student.main.Server.Exceptions.DatasourceException;
import edu.brown.cs.student.main.Server.Interfaces.CensusDataSource;
import edu.brown.cs.student.main.Server.Records.CensusData;
import edu.brown.cs.student.main.Server.Records.Geolocation;
import java.io.IOException;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;
import java.util.List;

import com.squareup.moshi.Types;
import okio.Buffer;

/**
 * Class for the backend connection with the census API. Queries state, then county, and then broadband
 * data in the county and returns using the getBroadband() method from CensusDataSource
 */
public class CensusAPI implements CensusDataSource {
  private HashMap<String, String> stateIDMap;

  public CensusAPI() {}

  @Override
  public CensusData getBroadband(Geolocation loc) throws DatasourceException {
    return getBroadband(loc.state(), loc.county());
  }

  private CensusData getBroadband(String state, String county) throws DatasourceException {
    State resolvedState = resolveState(state);
    County resolvedCounty = resolveCounty(county, resolvedState);
    BroadbandData resolvedBroadbandData = resolveBroadbandData(resolvedCounty, resolvedState);
    return new CensusData(Double.parseDouble(resolvedBroadbandData.S2802_C03_022E()));
  }

  private State resolveState(String queriedState) throws DatasourceException {
    try {
      // checks if state IDs have been stored already
      if (!(this.stateIDMap == null)){
        return new State(queriedState, this.stateIDMap.get(queriedState));
      }
      // Creates URL request for all state IDs for all 50 states
      URL requestURL =
          new URL("https", "api.census.gov", "/data/2010/dec/sf1?get=NAME&for=state:*");

      // Creates moshi in preparation to serialize state Json into list of lists of strings
      HttpURLConnection clientConnection = connect(requestURL);
      Moshi moshi = new Moshi.Builder().build();
      Type listStateObject = Types.newParameterizedType(List.class, Object.class);
      JsonAdapter<List<List<String>>> adapter = moshi.adapter(listStateObject);
      
      // Reads in API response as List<List<String>>
      List<List<String>> stateList = adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

      //Error checks if state is in list
      if (stateList == null || stateList.get(0) == null) {
        throw new DatasourceException("Malformed response from Census: State cannot be resolved");
      }


      // Removes "headers" from list of states
      stateList.remove(0);
      this.stateIDMap = new HashMap<>();
      // Creates hashmap with state names and state IDs
      for (List<String> list : stateList) {
        this.stateIDMap.put(list.get(0), list.get(1));
      }
      clientConnection.disconnect();
      // If state has no ID
      if (!this.stateIDMap.containsKey(queriedState)) {
        throw new DatasourceException("Malformed response from Census: State cannot be resolved");
      }
      return new State(queriedState, stateIDMap.get(queriedState));

    } catch (IOException e) {
      throw new DatasourceException((e.getMessage()));
    }
  }

  private static County resolveCounty(String queriedCounty, State resolvedState)
      throws DatasourceException {
    try {
      // Creates URL request for all county IDs in given state
      URL requestURL =
          new URL(
              "https",
              "api.census.gov",
              "/data/2010/dec/sf1?get=NAME&for=county:*&in=state:" + resolvedState.state());

      // Creates moshi in preparation to serialize state Json into list of lists of strings
      HttpURLConnection clientConnection = connect(requestURL);
      Moshi moshi = new Moshi.Builder().build();
      Type listStateObject = Types.newParameterizedType(List.class, Object.class);
      JsonAdapter<List<List<String>>> adapter = moshi.adapter(listStateObject);

      // Reads in API response as List<List<String>>
      List<List<String>> countyList = adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

      //Error checks if county is in list
      if (countyList == null || countyList.get(0) == null) {
        throw new DatasourceException("Malformed response from Census: County cannot be resolved");
      }

      // Remove headers for dataset
      countyList.remove(0);

      // Creates hashmap with county names and county IDs
      HashMap<String, String> countyIDMap = new HashMap<>();
      for (List<String> list : countyList) {
        countyIDMap.put(list.get(0), list.get(2));
      }
      clientConnection.disconnect();
      // Checks if county exists
      if (!countyIDMap.containsKey(queriedCounty)){
        throw new DatasourceException("No such county in " + resolvedState.NAME());
      }
      return new County(queriedCounty, resolvedState.state(), countyIDMap.get(queriedCounty));

    } catch (IOException e) {
      throw new DatasourceException((e.getMessage()));
    }
  }

  private static BroadbandData resolveBroadbandData(County resolvedCounty, State resolvedState)
      throws DatasourceException {
    try {
      // Creates URL for broadband data
      URL requestURL =
          new URL(
              "https",
              "api.census.gov",
              "/data/2021/acs/acs1/subject/variables?get=NAME,S2802_C03_022E&"
                  + "for=county:"
                  + resolvedCounty.county()
                  + "&in=state:"
                  + resolvedState.state());

      HttpURLConnection clientConnection = connect(requestURL);
      Moshi moshi = new Moshi.Builder().build();
      Type listStateObject = Types.newParameterizedType(List.class, Object.class);
      JsonAdapter<List<List<String>>> adapter = moshi.adapter(listStateObject);
      List<List<String>> broadbandList = adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
      if (broadbandList == null || broadbandList.get(0) == null) {
        throw new DatasourceException("Malformed response from Census: Broadband Data cannot be resolved");
      }

      clientConnection.disconnect();

      if (broadbandList.size() <= 1) {
        throw new DatasourceException("Malformed response from Census: Broadband Data cannot be resolved");
      }

      broadbandList.remove(0);

      return new BroadbandData(resolvedState.NAME(), broadbandList.get(0).get(1), resolvedState.state(), resolvedCounty.county());
    }
    catch (DatasourceException e) {
      throw new IllegalArgumentException("county not present in 2010 ACS 1-year: likely due to data suppression if county population below 65,000");
    }
    catch (IOException e) {
      throw new DatasourceException((e.getMessage()));
    }
  }


  public record State(String NAME, String state) {}

  public record County(String NAME, String state, String county) {}

  public record BroadbandData(String NAME, String S2802_C03_022E, String state, String county) {}

  /**
   * Private helper method; throws IOException so different callers can handle differently if
   * needed.
   */
  private static HttpURLConnection connect(URL requestURL) throws DatasourceException, IOException {
    URLConnection urlConnection = requestURL.openConnection();
    if (!(urlConnection instanceof HttpURLConnection))
      throw new DatasourceException("unexpected: result of connection wasn't HTTP");
    HttpURLConnection clientConnection = (HttpURLConnection) urlConnection;
    clientConnection.connect(); // GET
    if (clientConnection.getResponseCode() != 200)
      throw new DatasourceException(
          "unexpected: API connection not success status " + clientConnection.getResponseMessage());
    return clientConnection;
  }

}

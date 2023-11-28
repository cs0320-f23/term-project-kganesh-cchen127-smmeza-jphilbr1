package edu.brown.cs.student.main.Server.Classes;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.Server.Interfaces.CensusDataSource;
import edu.brown.cs.student.main.Server.Records.CensusData;
import edu.brown.cs.student.main.Server.Records.Geolocation;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;

public class CensusHandler implements Route {

  private final CensusDataSource data;

  public CensusHandler(CensusDataSource data) {
    this.data = data;
  }

  @Override
  public Object handle(Request request, Response response) {

    String state = request.queryParams("state");
    String county = request.queryParams("county");

    // Prepare to send a reply
    Moshi moshi = new Moshi.Builder().build();
    Type mapStringObject = Types.newParameterizedType(Map.class, String.class, Object.class);
    JsonAdapter<Map<String, Object>> adapter = moshi.adapter(mapStringObject);
//    JsonAdapter<CensusData> censusDataAdapter = moshi.adapter(CensusData.class);
    Map<String, Object> responseMap = new LinkedHashMap<>();

    // Generate the reply
    try {
      if (state == null && county == null){
        throw new RuntimeException("no query input provided");
      }
      if(state == null) {
        throw new IllegalArgumentException("state argument missing");
      }
      if(county == null) {
        throw new IllegalArgumentException("county argument missing");
      }

      Geolocation loc = new Geolocation(state, county);

      CensusData broadband = this.data.getBroadband(loc);

      // Building responses is the job of this class:
      responseMap.put("type", "success");
      responseMap.put("state_name", state);
      responseMap.put("county_name", county);
      // Note: we use toString() rather than moshi adapter because the format is nicer. Should you want
      // to expand your census data fields, you can either add to the toString() method or
      // uncomment lines 38 and 65 and comment out line 61.
      responseMap.put("broadband_data", broadband.toString());
//      responseMap.put("broadband_data", censusDataAdapter.toJson(broadband));

      DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss.S");
//      Line 66 for dtf without millisecond precision
//      DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
      LocalDateTime now = LocalDateTime.now();
      responseMap.put("timestamp", dtf.format(now));

      return adapter.toJson(responseMap);
    }
    catch (IllegalArgumentException e) {
      Map<String, Object> errorMap = new HashMap<>();
      errorMap.put("type", "error");
      errorMap.put("error_type", "bad_request");
      errorMap.put("details", e.getMessage());
      return adapter.toJson(errorMap);
    }
    catch (RuntimeException e) {
      Map<String, Object> errorMap = new HashMap<>();
      errorMap.put("type", "error");
      errorMap.put("error_type", "bad_json");
      errorMap.put("details", e.getMessage());
      return adapter.toJson(errorMap);
    }
    catch (Exception e) {
      Map<String, Object> errorMap = new HashMap<>();
      errorMap.put("type", "error");
      errorMap.put("error_type", "datasource");
      errorMap.put("details", e.getMessage());
      return adapter.toJson(errorMap);
    }
  }
}

package edu.brown.cs.student.main.CSV.Classes;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.CSV.Interfaces.CSVDataSource;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Viewer class takes the loaded csv and prints using dependency injection
 */
public class Viewer implements Route {
  private CSVDataSource csv;

  /**
   * Constructor for viewer class
   * @param csv - csv data source that should have been previously loaded by the parser
   */

  public Viewer(CSVDataSource csv) {
    this.csv = csv;
  }

  @Override
  public Object handle(Request request, Response response) {

    Moshi moshi = new Moshi.Builder().build();
    Type mapStringObject = Types.newParameterizedType(Map.class, String.class, Object.class);
    JsonAdapter<Map<String, Object>> adapter = moshi.adapter(mapStringObject);
    Map<String, Object> responseMap = new LinkedHashMap<>();

    try {

      // loads data from csv data source
      List<List<String>> data = this.csv.getData();
      List<String> headers = this.csv.getHeaders();

      // check if data has been loaded
      if (data == null) {
        throw new IllegalArgumentException("data is null");
      }

      // Building responses is the job of this class:
      responseMap.put("type", "success");

      // Adds data headers and body to response map
      // Put headers and results in response map if not null
      if (!(headers == null)) {
        responseMap.put("data_headers", headers);
      }
      responseMap.put("data_body", data);


      return adapter.toJson(responseMap);

    }
    // catch illegal argument exception if headers
    catch (IllegalArgumentException e) {
      Map<String, Object> errorMap = new HashMap<>();
      errorMap.put("type", "error");
      errorMap.put("error_type", "bad_request");
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

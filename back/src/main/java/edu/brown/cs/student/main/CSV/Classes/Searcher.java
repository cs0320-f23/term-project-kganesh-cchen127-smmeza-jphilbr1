package edu.brown.cs.student.main.CSV.Classes;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.CSV.Interfaces.CSVDataSource;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Class to search the parsed data for a target string. Implements route and supports dependency
 * injection for getting the csv file.
 */
public class Searcher implements Route {
  private CSVDataSource csv;

  /**
   * Constructor for Searcher
    * @param csv -- a CSVDataSource that contains the CSV data to be searched over, as well as if it has headers or not
   */
  public Searcher(CSVDataSource csv) {
    this.csv = csv;
  }

  @Override
  public Object handle(Request request, Response response) {

    // Prepare to send a reply
    Moshi moshi = new Moshi.Builder().build();
    Type mapStringObject = Types.newParameterizedType(Map.class, String.class, Object.class);
    JsonAdapter<Map<String, Object>> adapter = moshi.adapter(mapStringObject);
    Map<String, Object> responseMap = new LinkedHashMap<>();

    // Generate the reply
    try {

      // gets data and headers from csv data source
      List<List<String>> data = this.csv.getData();
      List<String> headers = this.csv.getHeaders();

      // checks if data has not been loaded yet
      if (data == null) {
        throw new IllegalArgumentException("searcher.handle: this.data is null");
      }

      String keyword = request.queryParams("keyword");

      // checks if there is a keyword search parameter
      if (keyword == null){
        throw new IllegalArgumentException("keyword argument missing");
      }
      String searchType = request.queryParams("search_type");

      // checks if there is a search type parameter
      if(searchType == null) {
        throw new IllegalArgumentException("search_type argument missing");
      }

      // Building responses is the job of this class:
      responseMap.put("type", "success");
      responseMap.put("keyword", keyword);
      responseMap.put("search_type", searchType);

      // Put headers and results in response map if not null
      if (!(headers == null)) {
        responseMap.put("data_headers", headers);
      }

      // Switch statement based on user input: 0 represents search all, 1 is search by index,
      // 2 is search by column name. Checks that each search type has proper arguments in query
      switch (Integer.parseInt(searchType)) {
        case 0 -> responseMap.put(
            "search_results", this.searchAll(keyword));
        case 1 -> {
          String colIndex = request.queryParams("col_index");
          if(colIndex == null) {
            throw new IllegalArgumentException("col_index argument missing");
          }
          responseMap.put("col_index", colIndex);
          responseMap.put(
              "search_results", this.searchIndex(keyword, colIndex));
        }
        case 2 -> {
          String colName = request.queryParams("col_name");
          if(colName == null) {
            throw new IllegalArgumentException("col_name argument missing");
          }
          if(headers == null) {
            throw new IllegalArgumentException("cannot search by header name in file with no headers");
          }
          responseMap.put("col_name", colName);
          responseMap.put(
              "search_results", this.searchHeader(keyword, colName));
        }
        default -> throw new IllegalArgumentException("searchType argument must be 0, 1, or 2");
      }

      return adapter.toJson(responseMap);
    }
    catch (NumberFormatException e){
      Map<String, Object> errorMap = new HashMap<>();
      errorMap.put("type", "error");
      errorMap.put("error_type", "bad_request");
      errorMap.put("details", "search_type must be 0, 1, or 2");
      return adapter.toJson(errorMap);
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

  /**
   * Method called when no index or column header is provided to narrow the search, hence the title
   * "searchAll" because we search all the data.
   *
   * @param target - Target string to search for
   * @return - returns dataset to print to user
   */
  public List<List<String>> searchAll(String target) {
    List<List<String>> result = new ArrayList<>();
    // for row in data
    for (List<String> row : this.csv.getData()) {
      // for string in row
      for (String string : row) {
        // if string is target
        if (string.equals(target)) {
          result.add(row);
        }
      }
    }
    return result;
  }

  /**
   * Method for searching only some data if a narrowing column or header is provided.
   *
   * @param details - either a number or string representing the search narrowing
   */
  public List<List<String>> searchIndex(String target, String details) {
    int col = Integer.parseInt(details);
    List<List<String>> result = new ArrayList<>();
    // bounds checking
    if (col < 0 || col > this.csv.getData().get(0).size()) {
      throw new IllegalArgumentException(
          "Searcher.searchIndex: The column index for searching is out of bounds");
    }
    // same process as searchAll() with narrowed search
    for (List<String> row : this.csv.getData()) {
      if (row.get(col).equals(target)) {
        result.add(row);
      }
    }
    return result;
  }

  /**
   * First, method converts header into index number and then calls searchIndex() to do the work
   *
   * @param target - target string
   * @param details - header name to search through
   * @return - dataset with target in given column
   */
  public List<List<String>> searchHeader(String target, String details) {
    // Find header with given name and convert to index, then run the method
    for (int i = 0; i < this.csv.getHeaders().size(); i++) {
      // lower case to handle case issues for the headers
      if (this.csv.getHeaders().get(i).equals(details.toLowerCase())) {
        return this.searchIndex(target, String.valueOf(i));
      }
    }
    // No header with the given name
    throw new IllegalArgumentException("Searcher.searchHeader: no header with given name");
  }
}

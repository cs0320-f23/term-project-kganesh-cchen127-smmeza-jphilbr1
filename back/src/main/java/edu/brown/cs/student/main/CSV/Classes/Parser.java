package edu.brown.cs.student.main.CSV.Classes;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.CSV.Interfaces.CSVDataSource;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;
import java.nio.file.Path;
import java.nio.file.Paths;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Class that handles loadcsv so that the csv file is parsed and uploaded into the server.
 * Uses dependency injection to handle csv between handlers
 */
public class Parser implements Route {

  static final Pattern regexSplitCSVRow =
      Pattern.compile(",(?=([^\\\"]*\\\"[^\\\"]*\\\")*(?![^\\\"]*\\\"))");
  private CSVDataSource csv;
  private final String folderpath = "data";

  /**
   * Constructor for the parser class takes in a csv data source
   * @param csv - csv data source kept in server class for dependency injection
   */
  public Parser(CSVDataSource csv) {
    this.csv = csv;
  }

  @Override
  public Object handle(Request request, Response response) {

    Moshi moshi = new Moshi.Builder().build();
    Type mapStringObject = Types.newParameterizedType(Map.class, String.class, Object.class);
    JsonAdapter<Map<String, Object>> adapter = moshi.adapter(mapStringObject);
    Map<String, Object> responseMap = new LinkedHashMap<>();

    // Generate the reply
    try {
      String filename = request.queryParams("filepath");
      String headersInput = request.queryParams("headers");

      // checks if file path is in specific folder
      Path filePathObj = Paths.get(filename);
      Path folderPathObj = Paths.get(this.folderpath);
      boolean isFileInFolder = filePathObj.startsWith(folderPathObj);

      if (!isFileInFolder){
        throw new IndexOutOfBoundsException("The file " + filename + " is NOT within the folder: " + this.folderpath);
      }

      // checks if arguments have been input
      if (filename == null){
        throw new IllegalArgumentException("filename argument missing");
      }
      else if (headersInput == null) {
        throw new IllegalArgumentException("header argument missing");
      }

      // makes sure boolean is input properly
      boolean headerBool;
      if(headersInput.equals("true") || headersInput.equals("false")) {
        headerBool = Boolean.parseBoolean(headersInput);
      }
      else {
        throw new IllegalArgumentException("headers must be true or false");
      }


      // parse data
      this.parse(filename, headerBool);
      responseMap.put("type", "success");
      responseMap.put("filepath", filename);
      responseMap.put("headers", headersInput);
      //return map reporting success
      return adapter.toJson(responseMap);
    }
    // catch illegal argument exception if headers are not in file
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
   * Main method of the parser. Uses csv file to parse data and return a list of Type T.
   *
   * @return - Returns new data set in the form of a list
   * @throws IOException - Thrown when there is an issue parsing the file, to be handled differently
   *     depending on implementation of parser
   *     <p>Factory failure exception is handled inside the method, and prints alert that there was
   *     an issue converting the row into an object of type T
   */
  public void parse(String filename, boolean headerBool) throws IOException {
    List<List<String>> returnList = new ArrayList<>();
    // Convert reader from constructor into Buffered reader for readline() method
    try {
      FileReader reader = new FileReader(filename);
      BufferedReader bReader = new BufferedReader(reader);
      // For testing
      String row = bReader.readLine();
      // If there are header, skip a line when parsing
      if (headerBool) {
        String[] headers = regexSplitCSVRow.split(row);
        // sends everything to lower case
        for (int i = 0; i < headers.length; i++) {
          headers[i] = headers[i].toLowerCase();
        }
        this.csv.setHeaders(List.of(headers));
        row = bReader.readLine();
      }
      // Repeat this process until end of CSV file
      while (row != null) {
        // Regex splits row into an array of strings
        String[] rowArr = regexSplitCSVRow.split(row);
        for (int i = 0; i < rowArr.length; i++) {
          if (rowArr[i].startsWith("\"") && rowArr[i].endsWith("\"")) {
            rowArr[i] = rowArr[i].substring(1, rowArr[i].length() - 1);
          }
          rowArr[i] = rowArr[i].trim();
        }
        returnList.add(List.of(rowArr));
        row = bReader.readLine();
      }
      // for dependency injection: sets the data
      this.csv.setData(returnList);
    } catch (IOException e) {
      throw new IOException("Parser.parse: file path not found");
    }
  }
}

package edu.brown.cs.student.main.CSV.Classes;

import edu.brown.cs.student.main.CSV.Interfaces.CSVDataSource;

import java.util.List;

/**
 * Class representing a csv data source. Implements csv data source so that it has setters and
 * getters for a data set. Useful for dependency injection of data between parser to
 * search and viewer
 */
public class CSVData implements CSVDataSource {
  private List<List<String>> data;
  private List<String> headers;

  public List<List<String>> getData() {
    return this.data;
  }

  public List<String> getHeaders() {
    return this.headers;
  }

  public void setData(List<List<String>> data) {
    this.data = data;
  }

  public void setHeaders(List<String> headers) {
    this.headers = headers;
  }
}

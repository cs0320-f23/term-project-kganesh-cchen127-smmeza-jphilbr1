package edu.brown.cs.student.main.CSV.Interfaces;

import java.util.List;

/**
 * CSV data source interface for dependency injection. Has methods for getting and setting data and headers.
 */
public interface CSVDataSource {

  List<List<String>> getData();

  List<String> getHeaders();

  void setData(List<List<String>> data);

  void setHeaders(List<String> headers);
}

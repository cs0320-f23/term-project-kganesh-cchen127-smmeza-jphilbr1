package edu.brown.cs.student.Server.Mocks;

import edu.brown.cs.student.main.CSV.Interfaces.CSVDataSource;
import java.util.List;

public class MockedCSV implements CSVDataSource {

  private List<List<String>> mockedData = List.of(
      List.of("Ilan", "Sophomore"),
  List.of("Jay", "Senior"));
  private List<String> mockedHeaders = List.of("name", "year");

  @Override
  public List<List<String>> getData() {
    return this.mockedData;
  }

  @Override
  public List<String> getHeaders() {
    return this.mockedHeaders;
  }

  @Override
  public void setData(List<List<String>> data) {
    this.mockedData=data;
  }

  @Override
  public void setHeaders(List<String> headers) {
    this.mockedHeaders=headers;
  }
}

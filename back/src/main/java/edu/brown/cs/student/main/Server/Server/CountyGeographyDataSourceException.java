package edu.brown.cs.student.main.Server.Server;

/** Exception thrown when there is an error with the census datasource */
public class CountyGeographyDataSourceException extends Exception {

  /**
   * Constructor for CountyGeographyDataSourceException.
   *
   * @param cause the cause of the exception
   */
  public CountyGeographyDataSourceException(Throwable cause) {
    super(cause);
  }
}
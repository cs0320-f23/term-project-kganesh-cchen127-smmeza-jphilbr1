package edu.brown.cs.student.main.Server.Server;

/** Exception thrown when there is an error with the census datasource */
public class CensusDataSourceException extends Exception {

  /**
   * Constructor for CensusDataSourceException.
   *
   * @param cause the cause of the exception
   */
  public CensusDataSourceException(Throwable cause) {
    super(cause);
  }
}
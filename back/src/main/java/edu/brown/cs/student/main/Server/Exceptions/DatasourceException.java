package edu.brown.cs.student.main.Server.Exceptions;

/**
 * Exception representing error with data source input
 */
public class DatasourceException extends Exception {
  private final Throwable cause;

  /**
   * Constructor with one parameter: message only
   * @param message -- message associated with error
   */
  public DatasourceException(String message) {
    super(message);
    this.cause = null;
  }

  /**
   * Constructor with two parameters: message and cause
   * @param message - message associated with error
   * @param cause - Throwable cause associated with error
   */
  public DatasourceException(String message, Throwable cause) {
    super(message);
    this.cause = cause;
  }
}

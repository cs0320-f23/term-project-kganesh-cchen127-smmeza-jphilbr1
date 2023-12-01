package edu.brown.cs.student.main.Server.Server;

import edu.brown.cs.student.main.utils.Pair;

/** Abstract class that represents a county geography data source */
public abstract class CountyGeographyDataSource {
  /** Constructor for CountyGeographyDataSource */
  public CountyGeographyDataSource() {}

  /**
   * Gets the state and county at a certain coordinate
   *
   * @param longitude the longitude of the coordinate
   * @param latitude the latitude of the coordinate
   * @return the given state and county at that coordinate
   * @throws CountyGeographyDataSourceException if there is an error getting the data
   */
  public abstract Pair<String, String> getStateAndCounty(double longitude, double latitude)
      throws CountyGeographyDataSourceException;
}
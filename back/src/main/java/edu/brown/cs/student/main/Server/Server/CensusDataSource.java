package edu.brown.cs.student.main.Server.Server;

import java.util.HashMap;

/** Abstract class that represents a census data source */
public abstract class CensusDataSource {

  /** Maps state names to their respective state codes */
  protected final HashMap<String, String> stateCodes;
  /** Maps state codes to a map of county names to their respective county codes */
  protected final HashMap<String, HashMap<String, String>> stateNumberToCountyCodes;

  /**
   * Constructor for CensusDataSource
   *
   * @throws CensusDataSourceException if there is an error populating state codes
   */
  public CensusDataSource() throws CensusDataSourceException {
    this.stateCodes = new HashMap<>();
    this.stateNumberToCountyCodes = new HashMap<>();

    populateStateCodes();
  }

  /**
   * Populates the state codes map
   *
   * @throws CensusDataSourceException if there is an error populating state codes
   */
  protected abstract void populateStateCodes() throws CensusDataSourceException;

  /**
   * Populates the county codes map for a given state
   *
   * @param state the state to populate the county codes for
   * @throws CensusDataSourceException if there is an error populating county codes
   */
  protected abstract void populateCountyCodesForState(String state)
      throws CensusDataSourceException;

  /**
   * Gets the census data for a given state and county
   *
   * @param state the state to get census data for
   * @param county the county to get census data for
   * @return the census data for the given state and county
   * @throws CensusDataSourceException if there is an error getting the data
   */
  public abstract String getCensusData(String state, String county)
      throws CensusDataSourceException;
}
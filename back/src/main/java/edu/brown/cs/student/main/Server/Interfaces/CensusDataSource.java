package edu.brown.cs.student.main.Server.Interfaces;

import edu.brown.cs.student.main.Server.Records.CensusData;
import edu.brown.cs.student.main.Server.Exceptions.DatasourceException;
import edu.brown.cs.student.main.Server.Records.Geolocation;

/**
 * Interface for census data, with method getBroadband which takes in geolocation and returns census data
 */
public interface CensusDataSource {

  CensusData getBroadband(Geolocation location) throws DatasourceException;
}

package edu.brown.cs.student.Server.Tests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import edu.brown.cs.student.Server.Mocks.MockedCensusAPI;
import edu.brown.cs.student.main.Server.Classes.CensusAPI;
import edu.brown.cs.student.main.Server.Exceptions.DatasourceException;
import edu.brown.cs.student.main.Server.Interfaces.CensusDataSource;
import edu.brown.cs.student.main.Server.Records.CensusData;
import edu.brown.cs.student.main.Server.Records.Geolocation;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class TestCensusAPI {

@BeforeEach
    public void setup(){

}

@AfterEach
    public void tearDown(){

}

@Test
    public void testProvidenceBroadband_REAL() throws DatasourceException{

      CensusDataSource source = new CensusAPI();
      Geolocation loc = new Geolocation("Rhode Island", "Providence County, Rhode Island");
      CensusData res = source.getBroadband(loc);
      assertNotNull(res);
      assertEquals(res, new CensusData(85.4));
}
}

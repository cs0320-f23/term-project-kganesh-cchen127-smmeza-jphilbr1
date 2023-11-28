package edu.brown.cs.student.Server.Mocks;

import edu.brown.cs.student.main.Server.Exceptions.DatasourceException;
import edu.brown.cs.student.main.Server.Interfaces.CensusDataSource;
import edu.brown.cs.student.main.Server.Records.CensusData;
import edu.brown.cs.student.main.Server.Records.Geolocation;

public class MockedCensusAPI implements CensusDataSource {


private final CensusData constantData;

public MockedCensusAPI(CensusData constantData){
    this.constantData=constantData;
}

@Override
    public CensusData getBroadband(Geolocation loc) throws DatasourceException{
    return this.constantData;
}
}

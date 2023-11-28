package edu.brown.cs.student.main.Server.Cache;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import edu.brown.cs.student.main.Server.Records.CensusData;
import edu.brown.cs.student.main.Server.Interfaces.CensusDataSource;
import edu.brown.cs.student.main.Server.Exceptions.DatasourceException;
import edu.brown.cs.student.main.Server.Records.Geolocation;
import java.util.concurrent.TimeUnit;


/**
 * Submitting this to show the work we started, although it contributes nothing to the functionality of our software
 */
public class CensusCache implements CensusDataSource {

  private CensusDataSource census;
  private LoadingCache<Geolocation, CensusData> cache;

  public CensusCache(CensusDataSource censusAPI) {
    this.census = censusAPI;

    //create cache
    this.cache = CacheBuilder.newBuilder()
        .maximumSize(100)
        .expireAfterWrite(3, TimeUnit.MINUTES)
        .build(
            new CacheLoader<Geolocation, CensusData>() {
              @Override
              public CensusData load(Geolocation key) throws Exception {
                System.out.println("called load for: "+key);
                return census.getBroadband(key);
              }
            });
  }

  @Override
  public CensusData getBroadband(Geolocation loc) throws DatasourceException {

    // "get" is designed for concurrent situations; for today, use getUnchecked:
    CensusData result = this.cache.getUnchecked(loc);

    // For debugging and demo
    System.out.println(this.cache.stats());

    return result;
  }

}

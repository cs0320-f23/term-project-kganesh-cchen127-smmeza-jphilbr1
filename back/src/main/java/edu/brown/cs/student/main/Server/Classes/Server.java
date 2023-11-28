package edu.brown.cs.student.main.Server.Classes;

import static spark.Spark.after;

import edu.brown.cs.student.main.CSV.Classes.CSVData;
import edu.brown.cs.student.main.CSV.Classes.Parser;
import edu.brown.cs.student.main.CSV.Classes.Searcher;
import edu.brown.cs.student.main.CSV.Classes.Viewer;
import edu.brown.cs.student.main.CSV.Interfaces.CSVDataSource;
import edu.brown.cs.student.main.Server.Interfaces.CensusDataSource;
import spark.Spark;

public class Server {

  static final int port = 3232;

  /**
   * High level server class to start server using spark java. Adds 4 different handlers for various 
   * functionality explained in documentation. Uses dependency injection to maintain consistency between
   * handlers.
   */
  private final CensusDataSource census;

  private final CSVDataSource csv;

  public Server(CensusDataSource census, CSVDataSource csv) {
    // Use whatever was dependency-injected into this constructor
    this.census = census;
    this.csv = csv;
    // Set up our SparkJava server:
    Spark.port(port);
    after(
        (request, response) -> {
          response.header("Access-Control-Allow-Origin", "*");
          response.header("Access-Control-Allow-Methods", "*");
        });

    // Set up handlers for CSV functionality and broadband search
    Spark.get("loadcsv", new Parser(this.csv));
    Spark.get("viewcsv", new Viewer(this.csv));
    Spark.get("searchcsv", new Searcher(this.csv));
    Spark.get("broadband", new CensusHandler(this.census));

    // Wait until the server has started.
    Spark.init();
    Spark.awaitInitialization();

    System.out.println("Server started at http://localhost:" + port);
  }

  public static void main(String[] args) {
//    Use line 55 to run without cache. Comment line 55 and uncomment line 57 to run with cache.
    Server server = new Server(new CensusAPI(), new CSVData());
//    How we would have used server with caching functionality:
//    Server server = new Server(new CensusCache(new CensusAPI()), new CSVData());
    System.out.println("Server started; exiting main...");
  }
}

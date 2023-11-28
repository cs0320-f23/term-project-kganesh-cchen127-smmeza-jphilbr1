package edu.brown.cs.student.main.Server.Server;

import static spark.Spark.after;

import spark.Spark;

public class Server {

  static final int port = 3232;

  /**
   * High level server class to start server using spark java. Adds 4 different handlers for various 
   * functionality explained in documentation. Uses dependency injection to maintain consistency between
   * handlers.
   */

  public Server() {
    // Use whatever was dependency-injected into this constructor
    // Set up our SparkJava server:
    Spark.port(port);
    after(
        (request, response) -> {
          response.header("Access-Control-Allow-Origin", "*");
          response.header("Access-Control-Allow-Methods", "*");
        });

    // Set up handlers for CSV functionality and broadband search
    Spark.get("income", new IncomeHandler());
//    Spark.get("unemployment", new SomeHandler());
//    Spark.get("industry_employment", new SomeHandler());

    // Wait until the server has started.
    Spark.init();
    Spark.awaitInitialization();

    System.out.println("Server started at http://localhost:" + port);
  }

  public static void main(String[] args) {
    Server server = new Server();
    System.out.println("Server started; exiting main...");
  }
}

package edu.brown.cs.student.Server.Tests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.Server.Mocks.MockedCSV;
import edu.brown.cs.student.Server.Mocks.MockedCensusAPI;
import edu.brown.cs.student.main.CSV.Classes.CSVData;
import edu.brown.cs.student.main.CSV.Classes.Parser;
import edu.brown.cs.student.main.CSV.Classes.Searcher;
import edu.brown.cs.student.main.CSV.Interfaces.CSVDataSource;
import edu.brown.cs.student.main.Server.Classes.CensusHandler;
import edu.brown.cs.student.main.Server.Interfaces.CensusDataSource;
import edu.brown.cs.student.main.Server.Records.CensusData;
import edu.brown.cs.student.main.Server.Records.Geolocation;
import java.io.IOException;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import okio.Buffer;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import spark.Spark;


public class TestParser {
    private Parser parser;
    private MockedCSV mockData;
    private CSVData realData;

    public TestParser() {
        this.mockData = new MockedCSV();
        this.realData = new CSVData();
        this.parser = new Parser(this.realData);
    }
    @Test
    void testMockCSV() {
        assertEquals(this.mockData.getData(), List.of(
            List.of("Ilan", "Sophomore"),
            List.of("Jay", "Senior")));
        assertEquals(this.mockData.getHeaders(), List.of("name", "year"));
        Searcher s = new Searcher(this.mockData);
        assertEquals(s.searchIndex("Jay", "0"), List.of(List.of("Jay", "Senior")));
        assertEquals(s.searchHeader("Jay", "name"), List.of(List.of("Jay", "Senior")));
        assertEquals(s.searchAll("Jay"), List.of(List.of("Jay", "Senior")));
        assertEquals(s.searchAll("Oof"), List.of());

        try {
            s.searchIndex("Jay", "10");
        }
        catch (Exception e) {
            System.out.println("TestParser.testMockCSV passed 1");
        }

        try {
            s.searchHeader("Jay", "race");
        }
        catch (Exception e) {
            System.out.println("TestParser.testMockCSV passed 2");
        }
    }
        @BeforeAll
        public static void setupOnce() {
            // Pick an arbitrary free port
            Spark.port(0);
            // Eliminate logger spam in console for test suite
            Logger.getLogger("").setLevel(Level.WARNING); // empty name = root
        }

        // Helping Moshi serialize Json responses; see the gearup for more info.
        private final Type mapStringObject = Types.newParameterizedType(Map.class, String.class, Object.class);
        private JsonAdapter<Map<String, Object>> adapter;
        //private JsonAdapter<CensusData> censusDataAdapter;

        @BeforeEach
        public void setup() {
            // Re-initialize parser, state, etc. for every test method

            // Use *MOCKED* data when in this test environment.
            // Notice that the WeatherHandler code doesn't need to care whether it has
            // "real" data or "fake" data. Good separation of concerns enables better testing.
            Spark.get("/loadcsv", new Parser(this.realData));
            Spark.awaitInitialization(); // don't continue until the server is listening

            // New Moshi adapter for responses (and requests, too; see a few lines below)
            //   For more on this, see the Server gearup.
            Moshi moshi = new Moshi.Builder().build();
            adapter = moshi.adapter(mapStringObject);
            //censusDataAdapter = moshi.adapter(CensusData.class);
        }

        @AfterEach
        public void tearDown() {
            // Gracefully stop Spark listening on both endpoints
            Spark.unmap("/broadband");
            Spark.awaitStop(); // don't proceed until the server is stopped
        }

    /*
    Recall that the "throws" clause doesn't matter -- JUnit will fail if an
    exception is thrown that hasn't been declared as a parameter to @Test.
     */

        /**
         * Helper to start a connection to a specific API endpoint/params
         *
         * @param apiCall the call string, including endpoint
         *                (Note: this would be better if it had more structure!)
         * @return the connection for the given URL, just after connecting
         * @throws IOException if the connection fails for some reason
         */
        private HttpURLConnection tryRequest(String apiCall) throws IOException {
            // Configure the connection (but don't actually send a request yet)
            URL requestURL = new URL("http://localhost:" + Spark.port() + "/" + apiCall);
            HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();
            // The request body contains a Json object
            clientConnection.setRequestProperty("Content-Type", "application/json");
            // We're expecting a Json object in the response body
            clientConnection.setRequestProperty("Accept", "application/json");

            clientConnection.connect();
            return clientConnection;
        }

        final Geolocation providence = new Geolocation("Rhode Island", "Providence County, Rhode Island");

        @Test
        public void testBroadbandRequestSuccess() throws IOException {
            /////////// LOAD DATASOURCE ///////////
            // Set up the request, make the request
            HttpURLConnection loadConnection = tryRequest("loadcsv?filepath=data/custom/ServerData&headers=true");
            // Get an OK response (the *connection* worked, the *API* provides an error response)
            assertEquals(200, loadConnection.getResponseCode());
            // Get the expected response: a success
            Map<String, Object> body = adapter.fromJson(new Buffer().readFrom(loadConnection.getInputStream()));
            showDetailsIfError(body);
            assertEquals("success", body.get("type"));

            // Mocked data: correct temp? We know what it is, because we mocked.
            assertEquals(this.realData.getHeaders(), this.mockData.getHeaders());
            assertEquals(this.realData.getData(), this.mockData.getData());

            loadConnection.disconnect();
        }

        private void showDetailsIfError(Map<String, Object> body) {
            if (body.containsKey("type") && "error".equals(body.get("type"))) {
                System.out.println(body.toString());
            }
        }
    }
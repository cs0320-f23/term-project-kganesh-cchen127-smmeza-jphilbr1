package edu.brown.cs.student.Server.Tests.Json;

import static org.junit.jupiter.api.Assertions.assertEquals;

import edu.brown.cs.student.Server.Tests.Fuzz.FuzzMethod;
import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import org.junit.jupiter.api.Test;
import edu.brown.cs.student.main.Server.Classes.ParseJson;

public class JsonTests {



  @Test
  public void testParseJsonGeo1()  {
    ParseJson jsonParser = new ParseJson();
    try {
      jsonParser.parseJson("data/json/geo_test_1.JSON");
      Map<String, Object> returnedJson = jsonParser.getParsedJson().data();
      assertEquals(
          Map.of("type", "Point", "coordinates", List.of(125.6, 10.1)),
          returnedJson.get("geometry"));
      assertEquals(
          Map.of("name", "Dinagat Islands"),
          returnedJson.get("properties"));
    } catch (IOException e) {
      throw new RuntimeException(e);
    }

  }

  @Test
  public void testParseJsonNonGeo1()  {
    ParseJson jsonParser = new ParseJson();
    try {
      jsonParser.parseJson("data/json/test_1.JSON");
      Map<String, Object> returnedJson = jsonParser.getParsedJson().data();
      assertEquals(
          "Jay",
          returnedJson.get("name"));
      assertEquals(
          21.0,
          returnedJson.get("age"));
      assertEquals(List.of("MSSM","UMPI","Brown"),
          returnedJson.get("education"));
    } catch (IOException e) {
      throw new RuntimeException(e);
    }

  }

}

package edu.brown.cs.student.Server.Tests.Json;

import static org.junit.jupiter.api.Assertions.assertEquals;

import edu.brown.cs.student.main.Server.Cache.RedlineCacheStrategy;
import edu.brown.cs.student.main.Server.Classes.ParseJson;
import edu.brown.cs.student.main.Server.Classes.RedlineHandler;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;

public class TestRedlineHandler {
  @Test
  public void testRedlineHandler() throws IOException {
    RedlineCacheStrategy r = new RedlineCacheStrategy(10, 1);
    RedlineHandler redlineHandler = new RedlineHandler(r);
    Map<String, Object> output = redlineHandler.getFilteredFeatures(List.of(0.0, 0.0, 0.0, 0.0));
    Map<String, Object> output2 = redlineHandler.getFilteredFeatures(List.of(1.0, 1.0, 1.0, 1.0));
    assertEquals(
        output,
        output2);
  }
}

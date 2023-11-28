package edu.brown.cs.student.main.Server.Classes;
import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.Server.Records.JsonData;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Map;

/**
 * class that parses jsons
 */
public class ParseJson {
  private JsonData parsedJson;

  /**
   * method to process a json
   * @param filename name of file to parse
   * @throws IOException
   */
  public void parseJson(String filename) throws IOException {
    // Convert reader from constructor into Buffered reader for readline() method
    try {
      FileReader reader = new FileReader(filename);
      BufferedReader bReader = new BufferedReader(reader);
      // For testing
      String row = bReader.readLine();
      StringBuilder input = new StringBuilder();
      // Repeat this process until end of CSV file
      while (row != null) {
        input.append(row);
        row = bReader.readLine();
      }
      Moshi moshi = new Moshi.Builder().build();
      Type mapStringObject = Types.newParameterizedType(Map.class, String.class, Object.class);
      JsonAdapter<Map<String, Object>> adapter = moshi.adapter(mapStringObject);
      this.parsedJson = new JsonData(adapter.fromJson(input.toString()));
    } catch (IOException e) {
      throw new IOException("Parser.parse: file path not found");
    }
  }

  public JsonData getParsedJson() {
    return this.parsedJson;
  }
}

package edu.brown.cs.student.main.Server.Classes;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import spark.Request;
import spark.Response;
import spark.Route;

import java.lang.reflect.Type;
import java.util.*;

/**
 * Spark handler class that process requests to view the redlining data, filtered by a keyword search
 */
public class SearchRedlineHandler implements Route {
    private final ArrayList<String> searchHistory;
    public SearchRedlineHandler(ArrayList<String> searchHistory) { this.searchHistory = searchHistory; }

    @Override
    public Object handle(Request request, Response response) {

        // Prepare to send a reply
        Moshi moshi = new Moshi.Builder().build();
        ParseJson jsonParser = new ParseJson();
        Type mapStringObject = Types.newParameterizedType(Map.class, String.class, Object.class);
        JsonAdapter<Map<String, Object>> adapter = moshi.adapter(mapStringObject);
        Map<String, Object> responseMap = new LinkedHashMap<>();

        // Generate the reply
        try {
            String keyword = request.queryParams("keyword").toLowerCase();

            // Max history of 10
            if (this.searchHistory.size() > 10) {
                this.searchHistory.remove(0);
                this.searchHistory.add(keyword);
            } else {
                this.searchHistory.add(keyword);
            }

            // Building response
            responseMap.put("type", "success");
            responseMap.put("keyword", keyword);


            // Load the file and retrieve the data
            jsonParser.parseJson("data/json/geodata.json");
            Map<String, Object> geodata = jsonParser.getParsedJson().data();

            // Extract the "features" array from the GeoJSON map
            List<Map<String, Object>> features = (List<Map<String, Object>>) geodata.get("features");
            // List to store the filtered features
            List<Map<String, Object>> filteredFeatures = new ArrayList<>();

            // Iterate through the features and make the keyword search
            for (Map<String, Object> feature : features) {
                Map<String, Object> properties = (Map<String, Object>) feature.get("properties");
                if (properties != null) {
                    Map<String, Object> desc_data = (Map<String, Object>) properties.get("area_description_data");

                    if(desc_data != null) {
                        for (Map.Entry<String, Object> desc : desc_data.entrySet()) {
                            // Normalize the string, make it all lowercase
                            String desc_normed = desc.getValue().toString().toLowerCase();
                            if (desc_normed.contains(keyword)) {
                                filteredFeatures.add(feature);
                                break;
                            }
                        }
                    }
                }
            }
            // Replace the old features
            geodata.replace("features", filteredFeatures);


            responseMap.put("redline_data", geodata);

//            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss.S");
//            LocalDateTime now = LocalDateTime.now();
//            responseMap.put("timestamp", dtf.format(now));

            return adapter.toJson(responseMap);
        }
        catch (NumberFormatException e) {
            Map<String, Object> errorMap = new HashMap<>();
            errorMap.put("type", "error");
            errorMap.put("error_type", "bad_request");
            errorMap.put("details", e.getMessage());
            return adapter.toJson(errorMap);
        }
        catch (RuntimeException e) {
            Map<String, Object> errorMap = new HashMap<>();
            errorMap.put("type", "error");
            errorMap.put("error_type", "bad_json");
            errorMap.put("details", e.getMessage());
            return adapter.toJson(errorMap);
        }
        catch (Exception e) {
            Map<String, Object> errorMap = new HashMap<>();
            errorMap.put("type", "error");
            errorMap.put("error_type", "datasource");
            errorMap.put("details", e.getMessage());
            return adapter.toJson(errorMap);
        }
    }
}
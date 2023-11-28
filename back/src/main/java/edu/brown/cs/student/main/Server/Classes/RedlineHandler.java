package edu.brown.cs.student.main.Server.Classes;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.Server.Cache.CacheStrategy;
import spark.Request;
import spark.Response;
import spark.Route;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.*;
import java.util.concurrent.ExecutionException;

/**
 * Spark handler class that process requests to view the redlining data, constricted by a boundary box
 * defined by a maximum and minimum latitude and longitude
 */
public class RedlineHandler implements Route {
    private final CacheStrategy cacheStrategy;

    public RedlineHandler(CacheStrategy cacheStrategy) {
        this.cacheStrategy = cacheStrategy;
    }

    @Override
    public Object handle(Request request, Response response) {

        // Prepare to send a reply
        Moshi moshi = new Moshi.Builder().build();
        Type mapStringObject = Types.newParameterizedType(Map.class, String.class, Object.class);
        JsonAdapter<Map<String, Object>> adapter = moshi.adapter(mapStringObject);
        Map<String, Object> responseMap = new LinkedHashMap<>();

        // Generate the reply
        try {
            double minLat = Double.parseDouble(request.queryParams("minLat"));
            double minLon = Double.parseDouble(request.queryParams("minLon"));
            double maxLat = Double.parseDouble(request.queryParams("maxLat"));
            double maxLon = Double.parseDouble(request.queryParams("maxLon"));

            // Building response
            responseMap.put("type", "success");
            responseMap.put("minLat", minLat);
            responseMap.put("minLon", minLon);
            responseMap.put("maxLat", maxLat);
            responseMap.put("maxLon", maxLon);

            responseMap.put("redline_data", this.cacheStrategy.get(List.of(minLat,minLon,maxLat,maxLon)));

            return adapter.toJson(responseMap);

        } catch (NumberFormatException e) {
            Map<String, Object> errorMap = new HashMap<>();
            errorMap.put("type", "error");
            errorMap.put("error_type", "bad_request");
            errorMap.put("details", e.getMessage());
            return adapter.toJson(errorMap);
        } catch (RuntimeException e) {
            Map<String, Object> errorMap = new HashMap<>();
            errorMap.put("type", "error");
            errorMap.put("error_type", "bad_json");
            errorMap.put("details", e.getMessage());
            return adapter.toJson(errorMap);
        } catch (ExecutionException e) {
            Map<String, Object> errorMap = new HashMap<>();
            errorMap.put("type", "error");
            errorMap.put("error_type", "cache");
            errorMap.put("details", e.getMessage());
            return adapter.toJson(errorMap);
        }catch (Exception e) {
            Map<String, Object> errorMap = new HashMap<>();
            errorMap.put("type", "error");
            errorMap.put("error_type", "datasource or other");
            errorMap.put("details", e.getMessage());
            return adapter.toJson(errorMap);
        }
    }


    /**
     * This method processes the map w/respect to boundary box and returns all those contained
     * @param box the list of boundaries minLat,minLon,maxLat,maxLon
     * @return features contained by the box
     */
    public static Map<String, Object> getFilteredFeatures(List<Double> box) throws IOException {
        double minLat = box.get(0);
        double minLon = box.get(1);
        double maxLat = box.get(2);
        double maxLon = box.get(3);
        // Load the file and retrieve the data
        ParseJson jsonParser = new ParseJson();
        jsonParser.parseJson("data/json/geodata.json");
        Map<String, Object> geodata = jsonParser.getParsedJson().data();

        // Extract the "features" array from the GeoJSON map
        List<Map<String, Object>> features = (List<Map<String, Object>>) geodata.get("features");

        // List to store the filtered features
        List<Map<String, Object>> filteredFeatures = new ArrayList<>();

        // Iterate through the features and apply the bounding box filter
        for (Map<String, Object> feature : features) {
            Map<String, Object> geometry = (Map<String, Object>) feature.get("geometry");
            if (geometry != null) {
                List<List<List<List<Double>>>> coordinateList = (List<List<List<List<Double>>>>) geometry.get("coordinates");
                List<List<Double>> coordinates = coordinateList.get(0).get(0);

                for (List<Double> point : coordinates) {
                    double lon = point.get(0);
                    double lat = point.get(1);
                    if (lat >= minLat && lat <= maxLat && lon >= minLon && lon <= maxLon) {
                        filteredFeatures.add(feature);
                        break;
                    }
                }
            }
        }

        // Replace the old features
        geodata.replace("features", filteredFeatures);
        return geodata;
    }
}
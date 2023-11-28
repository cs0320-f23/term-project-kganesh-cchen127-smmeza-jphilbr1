package edu.brown.cs.student.main.Server.Classes;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.Server.Interfaces.CensusDataSource;
import edu.brown.cs.student.main.Server.Records.CensusData;
import edu.brown.cs.student.main.Server.Records.Geolocation;
import spark.Request;
import spark.Response;
import spark.Route;

import java.lang.reflect.Type;
import java.util.*;

/**
 * class that returns broabdand as a geojson
 */
public class GeoBroadbandHandler implements Route {

    @Override
    public Object handle(Request request, Response response) throws Exception {
        // Prepare to send a reply
        Moshi moshi = new Moshi.Builder().build();
        ParseJson jsonParser = new ParseJson();
        Type mapStringObject = Types.newParameterizedType(Map.class, String.class, Object.class);
        JsonAdapter<Map<String, Object>> adapter = moshi.adapter(mapStringObject);
        Map<String, Object> responseMap = new LinkedHashMap<>();

        // Generate the reply
        try {
            // Load the files and retrieve the data
            // This is the geoJSON info about the bb counties
            jsonParser.parseJson("data/json/geo_bb.json");
            Map<String, Object> geo_bb = jsonParser.getParsedJson().data();
            // This is the actual bb info
            jsonParser.parseJson("data/json/all_bb.json");
            Map<String, Object> all_bb = jsonParser.getParsedJson().data();
            ArrayList<Map<String, Object>> counties = (ArrayList<Map<String, Object>>) all_bb.get("counties");

            // Create a new lookup table
            Map<String, String> lookupTable = new HashMap<>();

            // Populate the lookup table from the existing map
            for (Map<String, Object> entry : counties) {
                String state = entry.get("state").toString();
                String county = entry.get("county").toString();
                lookupTable.put(state + county, entry.get("S2802_C03_022E").toString());
            }

            // Extract the "features" array from the GeoJSON map
            List<Map<String, Object>> features = (List<Map<String, Object>>) geo_bb.get("features");

            // Iterate through the features and add the bb data
            for (Map<String, Object> feature : features) {
                Map<String, Object> properties = (Map<String, Object>) feature.get("properties");
                String state = properties.get("STATEFP").toString();
                String county = properties.get("COUNTYFP").toString();

                // Switch statement to categorize income
                String incomestr = lookupTable.get(state + county);
                if (incomestr != null) {
                    double income = Double.parseDouble(incomestr);
                    income -= 65;
                    char category = switch ((int) (income / 6)) {
                        case 0, 1 -> 'A';
                        case 2 -> 'B';
                        case 3 -> 'C';
                        case 4 -> 'D';
                        default -> 'E';
                    };
                    properties.put("income", category);
                } else {
                    properties.put("income", incomestr);
                }

            }

            // Building response
            responseMap.put("type", "success");
            responseMap.put("income_data", geo_bb);

            return adapter.toJson(responseMap);
        }
        catch (RuntimeException e) {
            e.printStackTrace();
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


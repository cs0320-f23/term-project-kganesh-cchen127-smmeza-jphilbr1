
import { REPLFunction } from "./REPLFunctionInterface";
/**
 * This file represents the click on the map
 * @param args an array of strings which represents the lat and long of an area
 * @returns a collection of features that will be highlighted from the given lat/long
 */

export const ClickOverLay: REPLFunction = async (
  args: Array<string>
): Promise< GeoJSON.FeatureCollection | undefined> => {
  var newResponse: undefined | GeoJSON.FeatureCollection = undefined;
  // trys to access the server
  try {
    const website = await fetch(
      "http://localhost:1200/filter_geo?maxLat=" +
        args[0] +
        "&minLat=" +
        args[1] +
        "&maxLon=" +
        args[2] +
        "&minLon=" +
        args[3]
    );
    const json = await website.json();
    const result = json.result;
    // checks that there isn't an error
    if(result === "success"){
      const overlayData: GeoJSON.FeatureCollection = json.filteredGeoData;
      newResponse = overlayData;

    }
    // this is the catch for if the server is down
  } catch (err) {
    console.log(err);
    newResponse = undefined;
  }
  // returns the server response
  return newResponse;
};

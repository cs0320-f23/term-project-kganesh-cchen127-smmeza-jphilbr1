import { REPLFunction } from "./REPLFunctionInterface";
import { searchOverlayData } from "./overlay";
// import { setKeyword, keyword} from "../Maps";
// import { handleSearch } from "../Maps/MapBox";
/**
 * This file represents the keyword command
 * @param args an array of strings which represents the commands input
 * @returns a collection of features that will be returned from
 * the searched keyword
 */

export const SearchOverLay: REPLFunction = async (
  args: Array<string>
): Promise<GeoJSON.FeatureCollection | undefined> => {
  var newResponse: undefined | GeoJSON.FeatureCollection = undefined;
  // trys to access the server
  try {
    const website = await fetch(
      "http://localhost:1200/search_area?target=" + args[0]
    );
    const json = await website.json();
    const result = json.result;

    if (result === "success") {
      const overlayData: GeoJSON.FeatureCollection = json.areas;
      console.log(overlayData);
      console.log(overlayData.type);
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
/**
 * This file represents the search command. It makes an api call
 * and then also updates the overlay using the handleSearchmethod
 * @param args the keyword that will be searched for
 * @returns a confirmation that shows the users that 
 * the keyword was searched for and that the features will
 * or won't be highlighted
 */
export const SearchHistory: REPLFunction = async (
  args: Array<string>
): Promise<(string[] | string)[][]> => {
  var newResponse: string[][] = [];
  var fullSearchString: string = "";
  // connects all the strings in the input so that
  // the server can actually use the whole keyword/words
  for (let i = 0; i < args.length; i++) {
    fullSearchString = fullSearchString + " " + args[i];
  }
  console.log(fullSearchString);
  // trys to access the server
  try {
    const website = await fetch(
      "http://localhost:1200/search_area?target=" + fullSearchString
    );
    const json = await website.json();
    const result: string = json.result;
    if (result === "success") {
      // lets the map know that the user is searching for
      // area, so that it can make an api call as well for the
      // features
      // handleSearch([fullSearchString]);
      const geoData: GeoJSON.FeatureCollection = json.areas;
      // gets the info from the first feature in the collection
      if (geoData.features.length !== 0) {
        // checks to besure that there is at least one feature with
        // the keyword
        newResponse = [
          ["target", args[0]],
          [
            "Highlight",
            "the areas highlighted in purple have the target in their description",
          ],
        ];
      } else {
        // if the number of features is 0 then lets the user know
        // no areas were found
        newResponse = [["error", "no areas were found"]];
      }
    }
    // this is the catch for if the server is down
  } catch (err) {
    console.log(err);
    newResponse = [["error", "Server is down"]];
  }
  // returns the server response
  return newResponse;
};

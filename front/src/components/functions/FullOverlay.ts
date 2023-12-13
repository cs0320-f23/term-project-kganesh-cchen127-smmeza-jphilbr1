
/**
 * This file represents the click on the map
 * @param args an array of strings which represents the lat and long of an area
 * @returns a collection of features that will be highlighted from the given lat/long
 */

export const FullOverLay = async (): Promise< GeoJSON.FeatureCollection | undefined> => {
  var newResponse: undefined | GeoJSON.FeatureCollection = undefined;
  // trys to access the server
  try {
    const website = await fetch(
      "http://127.0.0.1:5000/full_data"
    );
    const json = await website.json();
    const result = json.status;
    // checks that there isn't an error
    console.log("before succes");
    if(result === "success"){
      const overlayData: GeoJSON.FeatureCollection = json.data;
      newResponse = overlayData;
      console.log("should have overlay data");

    }
    // this is the catch for if the server is down
  } catch (err) {
    console.log(err);
    newResponse = undefined;
  }
  // returns the server response
  return newResponse;
};

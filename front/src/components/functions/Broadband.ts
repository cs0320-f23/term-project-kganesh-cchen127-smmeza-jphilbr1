import { REPLFunction } from "./REPLFunctionInterface";

/**
 * This file represents the Broadband command
 * @param args an array of strings which represents the commands input
 * @returns a new response based on the user's input
 */
export const Broadband: REPLFunction = async (
  args: Array<string>
): Promise<string[][]> => {
  var newResponse: string[][] = [];
    // trys to access the server
    try {
      // removes the quotes from around the search terms (if they have them)
      const lat: string = args[0];
      const lon: string = args[1];
      const success = await fetch(
        "http://localhost:1200/broadband?lat=" +
          lat +
          "&lon=" +
          lon
      );
      const json = await success.json();
      const result: string = json.result;

      // makes sure that the broadband was successful
      if (result === "success") {
        // returns the broadband and all the corresponding data 
        // if the user only clicks it should remove everything after
        // data/time in the click method in MapBox
        newResponse = [
          ["Broadband", json.broadband_percent + "%"],
          ["Date/time", json.date_and_time_retrieved],
          ["latitude", json.lat],
          ["longitude", json.lon],
          ["State", json.state],
          ["County", json.county]
        ];
        // response the server will output if there's a bad request
      }  
      if(result === "error"){
        newResponse = [["error type", json.error_type], ["error message", json.error_message],
        ["latitude", json.lat], ["longitude", json.lon]];
      }

      // this is the catch for if the server is down
    } catch (err) {
      console.log(err);
      newResponse = [["error", "Server is down"]];
    }
  // returns the server response
  return newResponse;
};

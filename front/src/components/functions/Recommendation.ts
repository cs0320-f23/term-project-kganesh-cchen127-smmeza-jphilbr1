import { REPLFunction } from "./REPLFunctionInterface";
import { second_data } from "../mockedData/byte-sizedMockedData"

/**
 * This file represents the Broadband command
 * @param args an array of strings which represents the commands input
 * @returns a new response based on the user's input
 */
export const Recommendation: REPLFunction = async (
  args: Array<string>
): Promise<string[][]> =>{
  var newResponse: string[][]  = [];
    // trys to access the server
    try {
      // removes the quotes from around the search terms (if they have them)

      // const lat: string = args[0];
      // const lon: string = args[1];
      // const success = await fetch(
      //   "http://127.0.0.1:5000/detailed_data?latitude" +
      //     lat +
      //     "&longitude=" +
      //     lon
      // );
      // const json = await success.json();
      const json = second_data;
      const result: string = json.result;

      // makes sure that the broadband was successful
      if (result === "success") {
        // returns the broadband and all the corresponding data
        // if the user only clicks it should remove everything after
        // data/time in the click method in MapBox
        var longRecList = json.rec.longs;
        var longRec = " ";
        if(longRecList.isEmpty()){
          longRec = "No recommendations";
        } else{
          for(let i = 0; i < longRecList.size(); i ++){
            longRec = longRec + longRecList[i] + ", ";
          }
        }

        var shortRecList = json.reec.longs;
        var shortRec = " ";
        if (shortRecList.isEmpty()) {
          shortRec = "No recommendations";
        } else {
          for (let i = 0; i < shortRecList.size(); i++) {
            shortRec = shortRec + shortRecList[i] + ", ";
          }
        }
        newResponse = [
          ["Hold this set of commodities ", longRec],
          ["Short this set of commodities", shortRec],
          [
            "Number of Construction employees",
            json.breakdown.data.employees_construction,
          ],
          [
            "Number of Education and Health employees",
            json.breakdown.data.employees_educationandhealth,
          ],
          [
            "Number of Finance employees",
            json.breakdown.data.employees_finance,
          ],
          [
            "Number of Information employees",
            json.breakdown.data.employees_information,
          ],
          [
            "Number of Leisure and Hospitality employees",
            json.breakdown.data.employees_leisureandhospitality,
          ],
          [
            "Number of Manufacturing employees",
            json.breakdown.data.employees_manufacturing,
          ],
          ["Number of Mining employees", json.breakdown.data.employees_mining],
          [
            "Number of Professional Service employees",
            json.breakdown.data.employees_professionalservices,
          ],
          [
            "Number of Trade, Transport, and Utilities employees",
            json.breakdown.data.employees_tradetransportutilities,
          ],
          [
            "Number of Other Service employees",
            json.breakdown.data.employees_otherservices,
          ],
        ];
        // response the server will output if there's a bad request
      }
      if (result === "error") {
        newResponse = [
          ["error type", json.error_type],
          ["error message", json.error_message],
          ["latitude", json.lat],
          ["longitude", json.lon],
        ];
      }

      // this is the catch for if the server is down
    } catch (err) {
      console.log(err);
      newResponse = [["error", "Server is down"]];
    }
  // returns the server response
  return newResponse;
};

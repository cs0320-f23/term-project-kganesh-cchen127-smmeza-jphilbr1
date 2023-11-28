import { REPLFunction } from "./REPLFunctionInterface";
import { setMode } from "../Maps";

/**
 * This file represents the mode command
 * @param args an array of strings which represents the commands input
 * @returns a new response based on the user's input
 */
export const Mode: REPLFunction = async (
  args: Array<string>
): Promise<string | string[][]> => {
  var newResponse: string[][] = [];

  // sees if brief was in the input
  if (args[0] === "brief") {
    // creates a response for the user
    newResponse = [["Mode", "brief"]];
    // changes the mode across classes to be in brief mode
    setMode(true);

    // sees if verbose was in the input
  } else if (args[0] === "verbose") {
    // creates a response for the user
    newResponse = [["Mode", "verbose"]];
    // changes the mode across classes to be in brief mode
    setMode(false);
  } else {
    newResponse = [["error", "Please enter either brief or verbose mode"]];
  }

  // returns the response
  return newResponse;
};

import React from "react";
import "../../styles/main.css";
import { useState, SetStateAction, Dispatch } from "react";
import { ControlledInput } from "./ControlledInput";
import { REPLFunction } from "../functions/REPLFunctionInterface";
import { Mode } from "../functions/Mode";
import { Broadband } from "../functions/Broadband";
import { SearchHistory } from "../functions/Search";
import { convertToAbbreviation } from "../stateAbbreviations";
import { MapRef } from "react-map-gl";

interface MapsInputProps {
  updateHistory: (command: (string | string[][])[]) => void;
  // setNotification: Dispatch<SetStateAction<string>>;
  isBrief: boolean;
  selectCounty: string[][];
  setSelectCounty: Dispatch<SetStateAction<string[][]>>;
}

var REPLMap = new Map<string, REPLFunction>();

export function register(key: string, value: REPLFunction) {
  REPLMap.set(key, value);
}

export function unregister(key: string) {
  REPLMap.delete(key);
}

// This is a mock function for broadband
export function mockBroadband(
  args: Array<string>
): Promise<string | string[][]> {
  return new Promise((resolve) => {
    resolve(
      "The broadband percent in " +
        args[1] +
        " County, " +
        args[0] +
        " is 93.0% accessed at 2023-10-27 at 16:34:13 EDT"
    );
  });
}

export function mockFunctions() {
  register("broadband_mock", mockBroadband);
}

// this registers the functions to use in the input bar
export function startFunctions() {
  register("mode", Mode);
  register("broadband", Broadband);
  register("search", SearchHistory);
}

export function MapsInput(props: MapsInputProps) {

  const [commandString, setCommandList] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  console.log(selectedState);

  // this registers the functions beforehand, it can be changed
  // to fit any functions that a different developer may use
  startFunctions();
  mockFunctions();

  // this is our handleClick function
  // it handles the input before the history class formats it
  const handleClick = async () => {
    // const map = mapRef.current;
    // var commandList = commandString.split(" ");
    const stateAbbrv = convertToAbbreviation(selectedState);
    console.log(stateAbbrv);
    // let newResponse: string | string[][] = "";
    const selectionArray = ['all',
                            ['in', 'COUNTYNAME', commandString],
                            ['in', 'STATE', stateAbbrv]];
    console.log(selectionArray);
    props.setSelectCounty(selectionArray);          
    console.log(props.selectCounty)          

    setCommandList("");
    // // this checks if the command is registered
    // if (commandList && REPLMap.get(commandList[0])) {
    //   let restOfCommand = commandList.splice(1);
    //   let calledFunction = REPLMap.get(commandList[0]);
    //   if (calledFunction) {
    //     var response = await calledFunction(restOfCommand);
    //     // make an if to check it's a string and not a feature collection
    //     if (typeof response === "string" || Array.isArray(response)) {
    //       newResponse = response;
    //     }
    //   }

    //   props.updateHistory([commandList[0], newResponse]);
    // } else {
    //   // if the command is not registered it produces an error
    //   newResponse = [["error", "the command is not found"], ["command list", "broadband [lat] [lon], search [keyword(s)], mode [brief/verbose]"]]
    //   props.updateHistory([commandList[0], newResponse]);
    // }

    
  };

  return (
    <div className="maps-input">
      {/* <hr aria-hidden="true"></hr> */}
        <ControlledInput
          value={commandString}
          setValue={setCommandList}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          ariaLabel={"Command input"}
          onKeyDown={handleClick}
        />
      <button
        className="submit-button"
        aria-label="Submit Button"
        aria-roledescription="Click or press Enter to submit"
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleClick;
          }
        }}
      >
        Enter!
      </button>
      {/* <hr aria-hidden="true"></hr> */}
    </div>
  );
}

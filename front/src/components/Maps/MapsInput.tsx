import React from "react";
import "../../styles/main.css";
import { useState, SetStateAction, Dispatch } from "react";
import { ControlledInput } from "./ControlledInput";
import { REPLFunction } from "../functions/REPLFunctionInterface.tsx";
import { Mode } from "../functions/Mode.ts";
import { Broadband } from "../functions/Broadband";
import { SearchHistory } from "../functions/Search.ts";
import { convertToAbbreviation } from "../stateAbbreviations.ts";
import { MapRef } from "react-map-gl";

interface MapsInputProps {
  // updateHistory: (command: (string | string[][])[]) => void;
  // setNotification: Dispatch<SetStateAction<string>>;
  // isBrief: boolean;
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
    // props.setSelectCounty(selectionArray);          
    console.log(props.selectCounty)          

    setCommandList("");

    
  };

  return (
    <div className="maps-input">
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
    </div>
  );
}

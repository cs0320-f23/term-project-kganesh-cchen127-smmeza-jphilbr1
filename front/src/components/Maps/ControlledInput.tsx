import React from "react";
import "../../styles/main.css"
import { Dispatch, SetStateAction } from "react";
import statesList from "../statesList";

interface ControlledInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
  onKeyDown: () => void;
  selectedState: string;
  setSelectedState: Dispatch<SetStateAction<string>>;
}

// Input boxes contain state. We want to make sure React is managing that state,
//   so we have a special component that wraps the input box.
export function ControlledInput({
  value,
  setValue,
  ariaLabel,
  onKeyDown,
  selectedState,
  setSelectedState,
}: ControlledInputProps) {
  return (
    // <input
    //   type="text"
    //   id="maps-command-box"
    //   className="maps-command-box"
    //   value={value}
    //   placeholder="Enter command here!"
    //   onChange={(ev) => setValue(ev.target.value)}
    //   aria-label={ariaLabel}
    //   aria-roledescription="Click the enter button or press enter to submit"
    //   onKeyUp={(e) => {
    //     if (e.key === "Enter") {
    //       onKeyDown();
    //     }
    //   }}
    // ></input>
    <div className="input-group">
      <input
        className="input"
        required
        type="text"
        id="maps-command-box"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
        aria-label={ariaLabel}
        aria-roledescription="Click the enter button or press enter to submit"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            onKeyDown();
          }
        }}
      ></input>
      <label className="county-label">Enter a county name!</label>

      <label className="state-label" htmlFor="state">
        State:
      </label>
      <div className="state-select">
        <select
          name="state"
          id="state"
          onChange={(e) => setSelectedState(e.target.value)}
          value={selectedState}
          // defaultValue="no state"
        >
          <option disabled value="no state">
            Select a state:
          </option>
          {statesList.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

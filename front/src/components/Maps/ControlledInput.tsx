import React from "react";
import "../../styles/main.css";
import { Dispatch, SetStateAction } from "react";
import statesList from "../functions/statesList";

interface ControlledInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
  onKeyDown: () => void;
  selectedState: string;
  setSelectedState: Dispatch<SetStateAction<string>>;
}

/**
 * This is our controlled input which is similar to a form
 * as it has components for the input box and a dropdown for uses to
 * input info in.
 * @param param0
 * @returns html components that can be used specifically for our app
 * these components include a input box and a dropdown that contains
 * all the states in the United States
 */
export function ControlledInput({
  value,
  setValue,
  ariaLabel,
  onKeyDown,
  selectedState,
  setSelectedState,
}: ControlledInputProps) {
  return (
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
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onKeyDown();
            }
          }}
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

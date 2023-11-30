import React from "react";
import "../../styles/main.css"
import { Dispatch, SetStateAction } from "react";

interface ControlledInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
  onKeyDown: () => void;
}

// Input boxes contain state. We want to make sure React is managing that state,
//   so we have a special component that wraps the input box.
export function ControlledInput({
  value,
  setValue,
  ariaLabel,
  onKeyDown,
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
      <input className="input" 
             required type="text" 
             id="maps-command-box"
             value={value}
             onChange={(ev) => setValue(ev.target.value)}
             aria-label={ariaLabel}
             aria-roledescription="Click the enter button or press enter to submit"
             onKeyUp={(e) => {
              if (e.key === "Enter") {
                onKeyDown();
              }
             }}>
      </input>
      <label className="label">Enter command here!</label>
      {/* <label className="state-label" htmlFor="state">State:</label>
      <select name="state" id="state">
        <option value="New Jersey">New Jersey</option>
      </select> */}
    </div>
  );
}

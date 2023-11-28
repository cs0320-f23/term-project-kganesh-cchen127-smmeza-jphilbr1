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
    <input
      type="text"
      id="maps-command-box"
      className="maps-command-box"
      value={value}
      placeholder="Enter command here!"
      onChange={(ev) => setValue(ev.target.value)}
      aria-label={ariaLabel}
      aria-roledescription="Click the enter button or press enter to submit"
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          onKeyDown();
        }
      }}
    ></input>
  );
}

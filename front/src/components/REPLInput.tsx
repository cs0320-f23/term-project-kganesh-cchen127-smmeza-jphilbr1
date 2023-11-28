import "../styles/main.css";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { ControlledInput } from "./ControlledInput";
import { userDefinedCommands } from "../commandRegistry";



// This interface contains the history (a list of 2D Arrays)
// and a setHistory function
export interface REPLInputProps {
  history: string[][][];
  setHistory: Dispatch<SetStateAction<string[][][]>>;
  updateCurrentIndex: (newIndex: number) => void;
  currentIndex: number;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export function addOutput(mode: boolean, props: REPLInputProps, commandString: string, output: string[][]) {
  if (mode) {
    props.setHistory([
      ...props.history,
      [["Command: " + commandString]],
      [["Output: "]],
      output,
    ]);
  } else {
    props.setHistory([...props.history, output]);
  }
}

// Class that handles when text input is sent to the server.
export function REPLInput(props: REPLInputProps) {
  let [commandString, setCommandString] = useState<string>("");
  let [mode, setMode] = useState<boolean>(false);
  // let [fileLoaded, setFile] = useState<boolean>(false);
  let [hasHeaders, setHasHeaders] = useState<boolean>(false);
  let [filename, setFilename] = useState<string>("");

  // let [headers, setHeaders] = useState<string[]>([]);
  // let [body, setBody] = useState<string[][]>([]);


  // This function is triggered when the button is clicked to handle whatever
  // command is sent.
  function handleSubmit(commandString: string) {
    let command = commandString.split(" ", 3);
    if (typeof command[0] === "string") {
      props.setSearchTerm(command[0])
    }
    // if (command[0] == "load_file") {
    //   handleLoad(commandString, command);
    // } else if (command[0] == "view") {
    //   handleView(commandString, command);
    //   // view(commandString, [["hello world"]]);
    // } else 
    // if (command[0] == "mode") {
    //   if (mode) {
    //     setMode(!mode);
    //     addOutput(mode, props, commandString, [["Application has been set to brief mode"]]);
    //   } else {
    //     setMode(!mode);
    //     addOutput(mode, props, commandString, [
    //       ["Application has been set to verbose mode"],
    //     ]);
    //   }
    // }
    // } else if (command[0] == "search") {
    //   search(commandString, command);
    // } 
    // else if (command[0] == "broadband") {
    //   broadband(commandString, command);
    // }
    let keys = Array.from(userDefinedCommands.keys());
    let correctKeyIndex = undefined;
      for (let i = 0; i < keys.length; i++) {
        if(command[0] === keys[i]) {
          correctKeyIndex = i;
        }
      }
      console.log(correctKeyIndex)
      if(typeof correctKeyIndex === "number") {
        console.log(keys[correctKeyIndex])
      }
      

    if (correctKeyIndex !== undefined) {
      const replFunctionInstance = userDefinedCommands.get(keys[correctKeyIndex]);
      if (typeof replFunctionInstance !== "undefined") {
        replFunctionInstance(mode, props, commandString, command)
      }
      else {
        addOutput(mode, props, commandString, [["something really wrong: REPLInput 63"]]);
      }
    }
    else {
      addOutput(mode, props, commandString, [["Command not recognized"]]);
    }
    props.updateCurrentIndex(props.currentIndex - 1);
    setCommandString("");
}

  // This function adds a response to history. If the mode is true the response
  // will be added in verbose output, if false in brief.
  
  return (
    <div className="repl-input">
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
          handleSubmit={handleSubmit} 
        />
      </fieldset>
      <button onClick={() => handleSubmit(commandString)}>Submit</button>
    </div>
  );
}

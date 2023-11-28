import React from "react";
import "../../styles/main.css";

interface MapsHistoryProps {
  history: (string | string[][])[][];
  mode: boolean;
}
/**
 * Some of this code was borrowed from dkyerema
 * This code sets up our history component by creating a table, calling the table function
 * @param props - the MockHistoryProps interface
 * @returns the structure of our history component
 */
export function MapsHistory(props: MapsHistoryProps) {
  return (
    <div
      id="maps-history"
      className="maps-history"
      tabIndex={0}
      aria-label="History"
    >
      {/* This is where command history will go */}
      <div>
        {props.history.map((commandList) => (
          // creates a div that is mapped to the command in the history
          <div>
            {/* checks if the mode is verbose */}
            {!props.mode && <p>Command: {commandList[0]}</p>}
            {/* checks if the output is a string */}
            {typeof commandList[1] === "string" ? (
              <p>Output: {commandList[1]}</p>
            ) : (
              // checks if the output is a table, and creates one if so
              <div>
                Output:
                {table(commandList[1])}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * this is the table function that creates a table for the output
 * from the given data
 * @param commandList the data that is stored in a string [][] to be created into a table
 * @returns an html table made from the data
 */
export function table(commandList: string[][]) {
  return (
    <table style={{ width: 500 }}>
      <tbody>
        {/* because var body does not include the heading
                creates a regualr row for heading */}
        {/* creates the rest of the table */}
        {commandList.map((row, rowID) => (
          <tr key={rowID}>
            {row.map((cell, rowID) => (
              <td key={rowID}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

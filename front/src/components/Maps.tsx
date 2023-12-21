import React from "react";
import "../styles/app.css";
import MapBox from "./Maps/MapBox";

/* 
  This is the class that creates most of our variables that handle state across 
  multiple classes. 
  
  This is where we organize all components in a component folder.
*/


// these are out side of the Mock function so that our Mode REPLfunction can use them

interface MapProps {
  isDark;
}

export default function Maps(props: MapProps) {
  // history, and how to update it

  return (
    <div >
      <div>
        <MapBox isDark={props.isDark}/>
      </div>

      <div>
        <hr aria-hidden="true"></hr>
      </div>
    </div>
  );
}

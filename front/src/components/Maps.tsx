import React from "react";
import "../styles/app.css";
import MapBox from "./Maps/MapBox";



// these are out side of the Mock function so that our Mode REPLfunction can use them

interface MapProps {
  isDark;
}

export default function Maps(props: MapProps) {

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

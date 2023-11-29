import React from "react";
import "../styles/App.css";
import Maps from "./Maps";

// REMEMBER TO PUT YOUR API KEY IN A FOLDER THAT IS GITIGNORED!!
// (for instance, /src/private/api_key.tsx)
// import {API_KEY} from "./private/api_key"

function App() {
  // keyboard shortcuts 
  document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.code == "MetaRight" || event.code == "MetaLeft") {
      document.getElementById("maps-command-box")?.focus();
    } else if (event.code == "Escape") {
      document.getElementById("maps-history")?.focus();
    } else if (event.code == "ControlRight" || event.code == "ControlLeft") {
      document.getElementById("submit-button")?.focus();
    } else{
      console.log(event.code);
    }
  });
  return (
    <div className="App">
      <div className="App-header">
        {/* <p className="App-header"> */}
          <h1 className="header">womp womp</h1>
        {/* </p> */}
      </div>
      <div className="section-header">
        <p className="section-text">
          INFO
        </p>
      </div>
      <div className="Info">
        <p>
          click on the toggling thing womp womp
        </p>
      </div>
      <div className="section-header">
        <p className="section-text">
          MAP
        </p>
      </div>
      <Maps />
    </div>
  );
}

export default App;

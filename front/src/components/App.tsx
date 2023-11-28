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
      <p className="App-header">
        <h1>Mesh Community Network</h1>
      </p>
      <Maps />
    </div>
  );
}

export default App;

import React from "react";
import "../styles/App.css";
import Maps from "./Maps";
import NavBar from "./NavBar";
import { DarkModeToggle } from "../darkModeComponents/Toggle";
import { useColorScheme } from "../darkModeComponents/usecolorScheme";
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
      // console.log(event.code);
    }
  });

  const { isDark, setIsDark } = useColorScheme();
  return (
    <div className="App">
      <NavBar isDark={isDark} setIsDark={setIsDark}/>
      {/* <div className="Dark-Toggle">
        <DarkModeToggle isDark={isDark} setIsDark={setIsDark} />
        <label>dark mode toggle</label>
      </div> */}
      <div id="info" className="section-header">
        <p className="section-text">INFO</p>
      </div>
      <div className="Info">
        <p className="Info-paragraph">
          <b>dot.commodities</b> simplifies the economic data viewing experience, and
          uses data to generate commodity futures trading recommendations for
          local financial institutions to hedge deposit risk.{" "}
        </p>
      </div>
      <div id="map" className="section-header">
        <p className="section-text">MAP</p>
      </div>
      <Maps isDark={isDark} />
      <div className="disclosure">
        <p >
          While dot.commodities strives to provide accurate and timely
          information, there may be inadvertent inaccuracies, errors and
          omissions, for which we apologize and expressly disclaim any
          liability. We reserve the right to make changes and corrections at any
          time, without notice. The content is provided on an "AS IS," "AS
          AVAILABLE" Basis. Any information denoting past or historical
          performance is not indicative of future performance and no reliance
          shall be placed on such information. Investing in commodity futures
          involves risk and may not be appropriate for all. Members risk losing
          their cost to enter any transaction, including fees. You should
          carefully consider whether taking recommendations from dot.commodities
          is appropriate for you in light of your investment experience and
          financial resources. Any trading decisions you make are solely your
          responsibility and at your own risk. Past performance is not
          necessarily indicative of future results.
        </p>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import Toggle from "react-toggle";
import { useColorScheme } from "./usecolorScheme";

/** stolen from https://blog.logrocket.com/dark-mode-react-in-depth-guide/ */

export const DarkModeToggle = () => {
  const { isDark, setIsDark } = useColorScheme();
  return (
    <Toggle
      checked={isDark}
      onChange={({ target }) => setIsDark(target.checked)}
      icons={{ checked: "🌙", unchecked: "🔆" }}
      aria-label="Dark mode toggle"
    />
  );
};

// import "./darkMode.css";
// function App() {
//   const [theme, setTheme] = useState("light");
//   const toggleTheme = () => {
//     if (theme === "light") {
//       setTheme("dark");
//     } else {
//       setTheme("light");
//     }
//   };
//   useEffect(() => {
//     document.body.className = theme;
//   }, [theme]);
//   return (
//     <div className={`App ${theme}`}>
//       <button onClick={toggleTheme}>Toggle Theme</button>
//       <h1>Hello, world!</h1>
//     </div>
//   );
// }
// export default App;

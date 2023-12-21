import React, { useState, useEffect } from "react";
import Toggle from "react-toggle";

import "react-toggle/style.css"; 
import "../../styles/navBar.css"

/** stolen from https://blog.logrocket.com/dark-mode-react-in-depth-guide/ */

interface ToggleProps {
  isDark;
  setIsDark;
}

export const DarkModeToggle = (props: ToggleProps) => {
  return (
    <Toggle
      className="dark-mode-toggle"
      checked={props.isDark}
      onChange={({ target }) => props.setIsDark(target.checked)}
      icons={{ checked: "☾", unchecked: "☼" }}
      aria-label="Dark mode toggle"
    />
  );
};



import React from "react";
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

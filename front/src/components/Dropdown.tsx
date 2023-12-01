import React from "react";
import "../styles/main.css"


// Input boxes contain state. We want to make sure React is managing that state,
//   so we have a special component that wraps the input box.
export function Dropdown() {
    
const options = [
  { label: "Alabama", value: "Alabama" },

  { label: "Alaska", value: "Alaska" },

  { label: "Arizona", value: "Arizona" },
];

const [value, setValue] = React.useState("State");

const handleChange = (event) => {
  setValue(event.target.value);
};

return (
  <div>
    <label>
      State
      <select value={value} onChange={handleChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  </div>
);


}

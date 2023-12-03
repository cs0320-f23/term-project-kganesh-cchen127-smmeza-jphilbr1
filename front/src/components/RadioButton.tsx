import React from "react";
import "../styles/main.css";

// Input boxes contain state. We want to make sure React is managing that state,
//   so we have a special component that wraps the input box.
export function CheckboxGroup() {
const [checkedOne, setCheckedOne] = React.useState(false);
const [checkedTwo, setCheckedTwo] = React.useState(false);

const handleChangeOne = () => {
  setCheckedOne(!checkedOne);
};

const handleChangeTwo = () => {
  setCheckedTwo(!checkedTwo);
};

return (
  <div>
    <Checkbox label="Value 1" value={checkedOne} onChange={handleChangeOne} />
    <Checkbox label="Value 2" value={checkedTwo} onChange={handleChangeTwo} />
  </div>
);
}

const Checkbox = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};

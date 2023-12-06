import React from "react";
import "../../styles/main.css"

// Input boxes contain state. We want to make sure React is managing that state,
//   so we have a special component that wraps the input box.
interface RadioButtonProps {
  onChange: (string) => void;
}

export function RadioButtonGroup(props: RadioButtonProps) {

const [selectedOption, setSelectedOption] = React.useState("Overlay 1");

function onValueChange(event){
  setSelectedOption(event.target.value);
  props.onChange(event.target.value);
}

return (
  <div>
    <div onChange={onValueChange}>
      <RadioButton
        label="variable 1"
        checked={selectedOption === "Overlay 1"}
        value="Overlay 1"
        name="overlay"
      />
      <RadioButton
        label="variable 2"
        checked={selectedOption === "Overlay 2"}
        value="Overlay 2"
        name="overlay"
      />
      {/* <RadioButton
        label="variable 3"
        checked={selectedOption === "Overlay 3"}
        value="Overlay 3"
        name="overlay"
      /> */}
    </div>
    the selected overlay is : {selectedOption} 
  </div>
);
}

const RadioButton = ({ label, checked, value, name }) => {
  return (
    <label>
      <input type="radio" checked={checked} value={value} name={name} />
      {label}
    </label>
  );
};


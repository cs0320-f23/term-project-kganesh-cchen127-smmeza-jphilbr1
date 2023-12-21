import React from "react";
import "../../styles/main.css"
import Tooltip from '@mui/material/Tooltip';

/**
 * 
 */
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
    <div className="all-radio-buttons" onChange={onValueChange}>
      <Tooltip title="Shows the unemployment rate">
        <div
          className="single-radio-button"
          aria-label="Unemployment Rate radio button"
        >
          <RadioButton
            label="Unemployment Rate"
            checked={selectedOption === "Overlay 1"}
            value="Overlay 1"
            name="overlay"
          />
        </div>
      </Tooltip>
      <Tooltip title="Shows the labor force count ">
        <div
          className="single-radio-button"
          aria-label="Labor force radio button"
        >
          <RadioButton
            label="Labor Force"
            checked={selectedOption === "Overlay 2"}
            value="Overlay 2"
            name="overlay"
          />
        </div>
      </Tooltip>
      <Tooltip title="Shows the number unemployed">
        <div
          className="single-radio-button"
          aria-label="Number of unemployed radio button"
        >
          <RadioButton
            label="Number of Unemployed"
            checked={selectedOption === "Overlay 3"}
            value="Overlay 3"
            name="overlay"
          />
        </div>
      </Tooltip>
      <Tooltip title="Shows the number of employed ">
        <div
          className="single-radio-button"
          aria-label="Number of Employed Rate radio button"
        >
          <RadioButton
            label="Number of Employed"
            checked={selectedOption === "Overlay 4"}
            value="Overlay 4"
            name="overlay"
          />
        </div>
      </Tooltip>
    </div>
  </div>
);
}

const RadioButton = ({ label, checked, value, name }) => {
  return (
    <label className="form-control">
      <input type="radio" checked={checked} value={value} name={name} />
      {label}
    </label>
  );
};


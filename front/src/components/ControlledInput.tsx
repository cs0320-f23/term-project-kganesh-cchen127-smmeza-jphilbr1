import '../styles/main.css';
import { Dispatch, SetStateAction } from 'react';

// This is an interface of state variables for the submission box and button
interface ControlledInputProps {
    value: string, 
    setValue: Dispatch<SetStateAction<string>>,
    ariaLabel: string 
    handleSubmit: (commandString: string) => void;
  }
  
  // This creates the text box and button used for submission
  export function ControlledInput({value, setValue, ariaLabel, handleSubmit}: ControlledInputProps) {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleSubmit(value);
      }
    };
    return (
      <div className="input-container">
        <input type="text" className="repl-command-box" data-testid="textbox"
              value={value} 
              placeholder="Enter command here!"
              onChange={(ev) => setValue(ev.target.value)}
              aria-label={ariaLabel}
              onKeyDown={handleKeyDown}>
        </input>
      </div>
    );
  }
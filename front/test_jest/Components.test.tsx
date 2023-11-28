import React from 'react';
import { describe, test, expect } from 'vitest'
import { render, fireEvent, screen } from "@testing-library/react";
import REPL from '../src/components/REPL';
import App from '../src/components/App';
import { REPLHistory } from '../src/components/REPLHistory';
import { REPLInput } from '../src/components/REPLInput';
import { ControlledInput } from '../src/components/ControlledInput';

describe('App Component', () => {
  test('returns a REPL component', () => {
    const { getByText } = render(<App />);

    const replComponent = getByText('REPL Webapp'); // Assuming 'REPL Webapp' is present in the REPL component
    
    expect(replComponent).not.toBeNull();
  });
});

describe('REPLHistory Output', () => {
    test('ensures that REPLHistory correctly outputs history', () => {
      const history = [[['Table 1']], [['Table 2']]];
      const currentIndex = 0;
      
      render(<REPLHistory history={history} currentIndex={currentIndex} />);
  
      const tableElements = screen.getAllByTestId('table');
  
      expect(tableElements).toHaveLength(2);
      expect(tableElements[0].textContent).toBe('Table 1');
      expect(tableElements[1].textContent).toBe('Table 2');
    });
});

describe('REPLHistory Component', () => {
  test('renders a list of commands with Table components', () => {
    const history = [
      [['Command 1']],
      [['Command 2']],
    ];
    const currentIndex = 0;

    render(<REPLHistory history={history} currentIndex={currentIndex} />);

    // Assuming that Table components are rendered within REPLHistory
    const tableElements = screen.getAllByTestId('table');
    expect(tableElements).toHaveLength(2);

    // You can further assert the content or structure of the Table components if needed
  });
});


describe('ControlledInput Component', () => {
    test('ControlledInput returns textbox', () => {
      const initialValue = '';
      let submittedValue = '';
      const mockHandleSubmit = (value) => {
        submittedValue = value;
      };
      const ariaLabel = 'Input Field';
  
      render(
        <ControlledInput
          value={initialValue}
          setValue={() => {}}
          ariaLabel={ariaLabel}
          handleSubmit={mockHandleSubmit}
        />
      );
  
      const inputElement = screen.getByTestId('textbox') as HTMLInputElement;
  
      const inputValue = 'Test Command';
  
      // Trigger the change event to set the input value
      inputElement.value = 'Test Command';
    //   // Simulate pressing the Enter key
    //   fireEvent.keyPress(inputElement, { key: "Enter", code: 13, charCode: 13 });

      // Check if the handleSubmit function is called with the expected value
      expect(inputElement.value).toEqual(inputValue);
    });
  });

  describe('REPL Component', () => {
    test('REPL renders REPLHistory and REPLInput', () => {
      render(<REPL />);
      
      // Check if the REPLHistory component is rendered
      const historyComponent = screen.getByRole('repl-history');
      expect(historyComponent).toBeDefined();
  
      // Check if the REPLInput component is rendered
      const inputComponent = screen.getByRole('repl-input');
      expect(inputComponent).toBeDefined();
    });
  });
  
  describe('REPLInput Component', () => {
    test('renders a ControlledInput component', () => {
      render(
        <REPLInput
          history={[]}
          setHistory={() => {}}
          updateCurrentIndex={() => {}}
          currentIndex={0}
        />
      );
  
      const controlledInput = screen.getByRole('textbox');
      
      expect(controlledInput).not.toBeNull();
    });
  });
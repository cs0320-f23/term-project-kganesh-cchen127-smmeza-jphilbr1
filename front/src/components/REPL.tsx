import { useState, useEffect } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import InteractMap from './InteractMap';

/* 
  This is the REPL's top level component, enabling rendering of all REPL components
*/

export default function REPL() {
  const [history, setHistory] = useState<string[][][]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(history.length - 1);
  const [searchTerm, setSearchTerm] = useState<string>("prestidigitation");

  const updateCurrentIndex = (newIndex: number) => {
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (event.key === "ArrowDown" && currentIndex < history.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    };
  
    window.addEventListener("keydown", handleKeyPress);
  
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentIndex, history]);

  // This renders the history as well as current input
  return (
    <div className="repl">
      {/* <div role="repl-history">
        <REPLHistory history={history} currentIndex={currentIndex}/>
      </div> */}
      <div className="map"> 
      <InteractMap searchTerm={searchTerm}/> 
      </div>
      <hr></hr>
      <div role="repl-input">
        <REPLInput history={history} setHistory={setHistory} updateCurrentIndex={updateCurrentIndex} currentIndex={currentIndex} setSearchTerm={setSearchTerm}/>
      </div>
    </div>
  );
}

import '../styles/App.css';
import REPL from './REPL';

/**
 * This is the highest level component!
 */
function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Real Estate Data Viewer</h1>
      </div>
      <REPL />      
    </div>
  );
}

export default App;

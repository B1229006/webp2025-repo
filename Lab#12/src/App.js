import './App.css';
import MultiButton from './cgu_multiButton';
import HelloCGU from './cgu_hello'
import logo from './logo.svg';

const styleArgument = {fontSize: '100px',color: 'red'}

function App() { 
  return ( 
    <div className="App">
      <div>
        { HelloCGU() }
      </div>
      <div>
        { MultiButton(10) }
      </div>
    </div> 
  ); 
}

export default App;


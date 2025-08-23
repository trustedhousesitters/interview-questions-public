import logo from "./logo.svg";
import "./App.css";
import PetList from "./components/PetList/";

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <div className="App-content">
      <PetList data-testid="pet-list" />
    </div>
  </div>
);

export default App;

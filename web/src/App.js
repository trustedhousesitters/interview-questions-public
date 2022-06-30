import React from "react";
import logo from "./logo.svg";
import PetList from "./components/PetList/";
import "./App.css";

const App = () => (
  <div className="App">
    <header className="app-header">
      <img src={logo} className="app-logo" alt="logo" />
    </header>
    <div className="app-content">
      <PetList data-testid="pet-list" />
    </div>
  </div>
);

export default App;

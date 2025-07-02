import React from "react";
import PetList from "./components/PetList/";
import { PetProvider } from "./context/PetContext";
import PetForm from "./components/PetForm/PetForm";
import logo from "./logo.svg";
import "./App.css";

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <div className="App-content">
      <PetProvider>
        <PetList data-testid="pet-list" />
        <PetForm />
      </PetProvider>
    </div>
  </div>
);

export default App;

import React from 'react';
import logo from './logo.svg';
import PetList from './components/PetList/';
import './App.css';
import { AddPet } from './components/AddPet/AddPet';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <div className="App-content">
      <AddPet data-test-id="add-pet" />
      <PetList data-testid="pet-list" />
    </div>
  </div>
);

export default App;

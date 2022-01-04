import React from 'react';
import logo from './logo.svg';
import PetList from './components/PetList/';
import AddPetForm from './components/AddPetForm/';
import './App.css';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
      <div className="App-content">
        <PetList data-testid="pet-list" />
        <AddPetForm />
      </div>
  </div>
);

export default App;

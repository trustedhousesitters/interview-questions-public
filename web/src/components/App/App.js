import React from 'react';
import logo from '../../assets/logo.svg';
import PetList from '../PetList';
import './App.css';

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

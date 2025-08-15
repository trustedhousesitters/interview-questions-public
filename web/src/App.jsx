import React from 'react';
import logo from './logo.svg';
import './App.css';
import PetList from './components/PetList/PetList';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <div className="App-content">
      <div  className="pet-item-container">
        <PetList data-testid="pet-list" />
      </div>
    </div>
  </div>
);

export default App;

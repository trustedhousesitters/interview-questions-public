import React from 'react';
import logo from './logo.svg';
import './App.css';

import PetList from './components/PetList/';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo trusted housesitters" />
      </header>

      <main className="App-content">
        <PetList data-testid="pet-list" />
      </main>
    </div>
  );
};

export default App;

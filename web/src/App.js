import React from 'react';
import { useSelector } from 'react-redux';
import logo from './logo.svg';
import './App.css';

import { getPets } from './components/PetList/selectors';

import PetList from './components/PetList/';

const App = () => {
  const pets = useSelector(getPets);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo trusted housesitters" />
      </header>

      <main className="App-content">
        <PetList pets={pets} data-testid="pet-list" />
      </main>
    </div>
  );
};

export default App;

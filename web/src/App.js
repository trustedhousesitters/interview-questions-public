import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from './logo.svg';
import './App.css';

import PetList from './components/PetList/';

import { selectPets } from './features/pets/petSlice';

const App = () => {
  const pets = useSelector(selectPets);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo trusted housesitters" />
      </header>

      <main className="App-content">
        <PetList dispatch={dispatch} pets={pets} data-testid="pet-list" />
      </main>
    </div>
  );
};

export default App;

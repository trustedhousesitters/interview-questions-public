import React from 'react';
import logo from './logo.svg';
import PetList from './components/PetList/';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import PetForm from './components/PetForm';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
      <div className="App-content">
      <Routes>
        <Route path="/" element={<PetList data-testid="pet-list" />} />
        <Route path="new-pet" element={<PetForm />} />
      </Routes>
       
      </div>
  </div>
);

export default App;

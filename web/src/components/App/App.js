import React, { useState } from 'react';
import FormContext from '../../contexts/FormContext';
import AddItem from '../AddItem/AddItem';
import PetList from '../PetList';
import logo from '../../assets/logo.svg';
import { initialFormData } from '../../constants';
import './App.css';

const App = () => {
  const [form, setForm] = useState(initialFormData);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <FormContext.Provider value={{ form, setForm }}>
        <AddItem />
        <div className="App-content">
          <PetList data-testid="pet-list" />
        </div>
      </FormContext.Provider>
    </div>
  );
};

export default App;

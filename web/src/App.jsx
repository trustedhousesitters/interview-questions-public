import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import PetSearch from './components/PetSearch';
import PetList from './components/PetList';

const App = () => {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);
  const [filteredPets, setFilteredPets] = useState([]);

  const handleResultsChange = useCallback((nextPets) => {
    setFilteredPets(nextPets || []);
  }, []);

  useEffect(() => {
    const fetchPets = async () => {
      setError('');
      try {
        const response = await fetch('/api/pets');
        if (response.status === 404) {
          setPets([]);
          setError('No pets found');
          return;
        }
        if (!response.ok) {
          throw new Error('Failed to fetch pets');
        }
        const data = await response.json();
        setPets(data);
      } catch (e) {
        setError('Failed to load pets. Please try again later.');
      }
    };
    fetchPets();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="App-content">
        <PetSearch data-testid="pet-search" pets={pets} onResultsChange={handleResultsChange} />
        <PetList data-testid="pet-list" error={error} pets={filteredPets} />
      </div>
    </div>
  );
};

export default App;

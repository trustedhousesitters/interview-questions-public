import React, { useCallback, useEffect, useMemo, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import PetSearch from './components/PetSearch';
import PetList from './components/PetList';
import { filterPets } from './utils';

const App = () => {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [petType, setPetType] = useState("");

  const filteredPets = useMemo(() => {
    return filterPets(pets, searchTerm, petType);
  }, [pets, searchTerm, petType]);

  const handleSearchTermChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handlePetTypeChange = useCallback((type) => {
    setPetType(type);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchTerm("");
    setPetType("");
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
        <PetSearch 
          data-testid="pet-search" 
          searchTerm={searchTerm}
          petType={petType}
          onSearchTermChange={handleSearchTermChange}
          onPetTypeChange={handlePetTypeChange}
          onClearSearch={handleClearSearch}
        />
        <PetList data-testid="pet-list" error={error} pets={filteredPets} />
      </div>
    </div>
  );
};

export default App;

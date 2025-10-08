import React from 'react';
import logo from './logo.svg';
import PetList from './components/PetList/';
import './App.css';
// import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const App = () => {
  // const client = new QueryClient()
  return(
    // <QueryClientProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
          <div className="App-content">
            <PetList data-testid="pet-list" />
          </div>
      </div>
    // </QueryClientProvider>

)};

export default App;

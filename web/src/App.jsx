import React from 'react';
import logo from './logo.svg';
import Carousel from './components/Carousel';
import FeaturedListing from './components/FeaturedListing';
import PetList from './components/PetList/';
import { featuredListings } from './mocks/featuredListings';
import './App.css';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <div className="App-content">
      <section className="featured-section">
        <h2 className="section-title">Featured Pets</h2>
        <Carousel 
          items={featuredListings}
          renderItem={(listing) => <FeaturedListing listing={listing} />}
        />
      </section>
      
      <section className="pets-section">
        <PetList data-testid="pet-list" />
      </section>
    </div>
  </div>
);

export default App;

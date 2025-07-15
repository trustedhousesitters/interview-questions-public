import React from "react";
import logo from "./logo.svg";
import PetList from "./components/PetList/";
import ListingCarousel from "./components/ListingCarousel/";
import "./App.css";

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <div className="App-content">
      <PetList data-testid="pet-list" />
      <ListingCarousel data-testid="listing-carousel" />
    </div>
  </div>
);

export default App;

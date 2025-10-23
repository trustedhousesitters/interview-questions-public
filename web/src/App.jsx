import logo from "./logo.svg";
import PetList from "./components/PetList/";
import Carousel from "./components/Carousel";
import CAROUSEL_IMAGES from "./data/imageData.js";
import "./App.css";

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <div className="App-content">
      <Carousel images={CAROUSEL_IMAGES} />
      <PetList data-testid="pet-list" />
    </div>
  </div>
);

export default App;

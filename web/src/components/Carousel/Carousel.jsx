import React, { useState } from "react";
import "./Carousel.css";

const Carousel = ({ items, renderItem }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!items || items.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel">
      <div className="carousel-container">
        <button
          className="carousel-button carousel-button-prev"
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          ‹
        </button>
        
        <div className="carousel-slide">
          {renderItem(items[currentIndex])}
        </div>

        <button
          className="carousel-button carousel-button-next"
          onClick={goToNext}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Carousel;

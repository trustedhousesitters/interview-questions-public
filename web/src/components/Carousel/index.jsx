import { useEffect, useRef, useState } from "react";
import useAutoAdvance from "./hooks/useAutoAdvance";
import "./Carousel.css";

import ArrowLeft from "./components/ArrowLeft";
import ArrowRight from "./components/ArrowRight";

const Carousel = ({ images }) => {
  // Set up slide clones to enable "infinite" carousel behaviour
  const slides = [
    images[images.length - 1], // Clone of last
    ...images,
    images[0], // Clone of first
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Check for reduced motion user preference
  const prefersReducedMotion = useRef(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ).current;

  // Set the initial translateX position of the first slide
  const translateX = -currentIndex * 100;

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  const handlePrevSlide = () => {
    if (isTransitioning) return;
    setCurrentIndex((prev) => {
      let newIndex = prev - 1;

      if (prefersReducedMotion && newIndex === 0) {
        return images.length; // Jump to real last slide
      }

      return newIndex;
    });
    setIsTransitioning(true);

    // Manually reset isTransitioning
    if (prefersReducedMotion) {
      setIsTransitioning(false);
    }
  };

  const handleNextSlide = () => {
    if (isTransitioning) return;
    setCurrentIndex((prev) => {
      let newIndex = prev + 1;

      if (prefersReducedMotion && newIndex === slides.length - 1) {
        return 1; // Jump to straight actual first slide
      }

      return newIndex;
    });
    setIsTransitioning(true);

    // Manually reset isTransitioning
    if (prefersReducedMotion) {
      setIsTransitioning(false);
    }
  };

  const getActualSlideNumber = (index) => {
    // Ensure Clone of last slide shows as the actiual last slide number
    if (index === 0) return images.length;
    // Ensure Clone of first slide shows as the actual last slide number
    if (index === slides.length - 1) return 1;
    return index;
  };

  useAutoAdvance(
    () => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    },
    // 6s delay between transitions
    6000,
    // Disable automatic cycling if prefersReducedMotion
    !prefersReducedMotion
  );

  // "Infinite" carousel logic
  useEffect(() => {
    // Don't run if still transitioning
    if (isTransitioning) return;

    // At clone of first slide (index 8)
    if (currentIndex === slides.length - 1) {
      // Jump to actual first slide
      setCurrentIndex(1);
    }

    // At clone of last slide (index 0)
    if (currentIndex === 0) {
      // Jump to actual last slide (index 7)
      setCurrentIndex(images.length);
    }
  }, [currentIndex, isTransitioning, slides.length, images.length]);

  return (
    <div
      className="carousel-container"
      role="region"
      aria-label="Image carousel"
      aria-roledescription="carousel"
    >
      {/* Announce slide changes */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {getActualSlideNumber(currentIndex)} of {images.length}
      </div>
      <div
        className="carousel-window"
        style={{
          transform: `translateX(${translateX}%)`,
          transition:
            isTransitioning && !prefersReducedMotion
              ? "transform 0.5s ease-in-out"
              : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides.map((slide, index) => (
          <div
            key={`${slide.src}-${index}`}
            className="carousel-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={
              index !== currentIndex
                ? undefined
                : `Slide ${getActualSlideNumber(index)} of ${images.length}`
            }
            aria-hidden={index !== currentIndex}
          >
            <img src={slide.src} alt={slide.alt} />
          </div>
        ))}
      </div>
      <button
        className="carousel-button carousel-button-prev"
        onClick={handlePrevSlide}
        disabled={isTransitioning}
        aria-label="Previous slide"
      >
        <ArrowLeft />
      </button>
      <button
        className="carousel-button carousel-button-next"
        onClick={handleNextSlide}
        disabled={isTransitioning}
        aria-label="Next slide"
      >
        <ArrowRight />
      </button>
    </div>
  );
};

export default Carousel;

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./ListingCarousel.css";
import { carouselListings } from "./assets/carouselListings";

import CarouselItem from "./components/CarouselItem/";

const ListingCarousel = () => {
  const carouselRef = useRef(null);
  const firstCardRef = useRef(null);

  const [firstCardWidth, setFirstCardWidth] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [startX, setStartX] = useState(null);
  const [startScrollLeft, setStartScrollLeft] = useState(null);
  const [cardsPerView, setCardsPerView] = useState(null);

  // Inserts duplicates of cards to the beginning and end of the carousel
  const loopedListings =
    cardsPerView && carouselListings.length > 0
      ? [
          ...carouselListings.slice(-cardsPerView),
          ...carouselListings,
          ...carouselListings.slice(0, cardsPerView),
        ]
      : carouselListings;

  useLayoutEffect(() => {
    if (firstCardRef.current) {
      setFirstCardWidth(firstCardRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    // Roughly calculates how many listing cards are visible on the page at once based on width
    if (!carouselRef.current || !firstCardWidth) return;

    setCardsPerView(
      Math.round(carouselRef.current.offsetWidth / firstCardWidth)
    );
  }, [firstCardWidth]);

  useEffect(() => {
    if (!firstCardWidth || window.innerWidth > 800) return;

    // Autoplays the carousel, once every 2.5s
    if (!isHovered) {
      const interval = setInterval(() => {
        if (carouselRef.current) {
          carouselRef.current.style.scrollBehavior = "smooth";
          carouselRef.current.scrollLeft += firstCardWidth;
        }
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isHovered, firstCardWidth, carouselRef]);

  const startDragging = (event) => {
    setIsDragging(true);
    // Records initial cursor and scroll positions of the carousel
    setStartX(event.pageX);
    setStartScrollLeft(carouselRef.current.scrollLeft);
  };

  const stopDragging = () => {
    setIsDragging(false);
    setStartScrollLeft(null);
    setStartX(null);
  };

  const dragging = (event) => {
    if (!isDragging) return;
    // Updates carousel scroll position based on cursor movement
    carouselRef.current.style.scrollBehavior = "auto";
    carouselRef.current.scrollLeft = startScrollLeft - (event.pageX - startX);
  };

  const infiniteScroll = () => {
    // If carousel's at the start, scroll to the end
    if (carouselRef.current.scrollLeft === 0) {
      carouselRef.current.scrollLeft =
        carouselRef.current.scrollWidth - 2 * carouselRef.current.offsetWidth;
    }
    // If carousel's at the end, scroll to the beginning
    else if (
      Math.ceil(
        carouselRef.current.scrollLeft ===
          carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
      )
    ) {
      carouselRef.current.style.scrollBehavior = "auto";
      carouselRef.current.scrollLeft = carouselRef.current.offsetWidth;
      carouselRef.current.style.scrollBehavior = "smooth";
    }
  };

  return (
    <div className="Carousel-body-wrapper">
      <h1>Listings</h1>
      <div
        className="Carousel-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ul
          className="Carousel"
          ref={carouselRef}
          data-dragging={isDragging || undefined}
          onScroll={infiniteScroll}
          onMouseDown={startDragging}
          onMouseMove={dragging}
          onMouseUp={stopDragging}
          onTouchStart={startDragging}
          onTouchMove={dragging}
          onTouchEnd={stopDragging}
        >
          {loopedListings.length > 0 ? (
            loopedListings.map((listing, index) => {
              if (index === 0) {
                return (
                  <CarouselItem
                    listing={listing}
                    key={index}
                    ref={firstCardRef}
                  />
                );
              }
              return <CarouselItem listing={listing} key={index} />;
            })
          ) : (
            <p>Listings will appear here...</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ListingCarousel;

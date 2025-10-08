import { useRef, useState } from "react"
import PetItem from "../PetItem/PetItem"
import './PetCarousel.css'

const PetCarousel = ({pets}) => {
    // We set a currentIndex in the state starting with Zero
    const [currentIndex, setCurrentIndex] = useState(0)
    // We create a ref that we will set on the container
    const containerRef = useRef(null)
    // This is the click event handler used by the buttons
    const handleClick = (event) => {
        // First we identify the direction from the data attribute
        const direction = event.currentTarget.dataset.direction;
        // Then we create a variable to check it
        const isPrev = direction === "prev";
        // We store the newIndex depending on the direction
        const newIndex = isPrev
          ? (currentIndex - 1 + pets.length) % pets.length
          : (currentIndex + 1) % pets.length;
      
        // We then set the newIndex as the Current Index in the state
        setCurrentIndex(newIndex);
      
        // We create a reference to the container
        const container = containerRef.current;
        // We grab the current item from the container 
        // dom reference (this will be used to calculate the width 
        // regardless the responsive viewport we are in) 
        const item = container.children[newIndex];
        // We set the gap // hardcoding this here same as CSS for simplicity
        const gap = 10; 
        // We grab the width of the card from the DOM item offsetWidth
        const cardWidth = item.offsetWidth;
        // We calculate how much to scroll by multiple the current index
        // by the width of the card and its gap
        const newScrollLeft = newIndex * (cardWidth + gap);
        // Finally we scroll the element to the specific item position
        container.scrollTo({
          left: newScrollLeft,
          behavior: "smooth"
        });
      };

    return <section className="PetCarousel">
        <h1 className="Pets-title">My Pets</h1>
        <div className="PetCarousel-container" ref={containerRef}>
            {/* <PetItem pet={pets[currentIndex]}/> */}
            {pets.map((pet, i) => (
                <div key={i} style={{  flex: "0 0 100%" }}>
                    <PetItem pet={pet} />
                </div>
            ))}
        </div>
        <div role="tracker" className="PetCarousel-tracker">
            {currentIndex + 1}/{pets.length}
        </div>
        <div className="PetCarousel-ctrl">
            <button data-direction={'prev'} onClick={handleClick} >Prev</button>
            <button data-direction={'next'} onClick={handleClick} >Next</button>
        </div>
    </section>
}

export default PetCarousel
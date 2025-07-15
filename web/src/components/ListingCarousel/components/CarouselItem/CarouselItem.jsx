import "./CarouselItem.css";

import dog from "../../../PetList/components/PetItem/assets/PetsPlaceholder/Dog.svg";
import cat from "../../../PetList/components/PetItem/assets/PetsPlaceholder/Cat.svg";
import reptile from "../../../PetList/components/PetItem/assets/PetsPlaceholder/Reptile.svg";
import smallPet from "../../../PetList/components/PetItem/assets/PetsPlaceholder/Smallpet.svg";
import horse from "../../../PetList/components/PetItem/assets/PetsPlaceholder/Horse.svg";
import farmAnimal from "../../../PetList/components/PetItem/assets/PetsPlaceholder/Farmanimal.svg";
import React from "react";

function getPetAvatarUrl(petType) {
  switch (petType) {
    case "Dog":
      return dog;
    case "Cat":
      return cat;
    case "Antelope":
      return reptile;
    case "Wild Boar":
      return farmAnimal;
    case "Horse":
      return horse;
    case "Rock":
      return smallPet;
    default:
      dog;
  }
}

const CarouselItem = React.forwardRef(({ listing }, ref) => {
  const { name, dates, location, imageUrl, imageAlt, pets } = listing;

  return (
    <li className="Listing" ref={ref} data-testid="carousel-slide">
      <img src={imageUrl} alt={imageAlt} className="Image" draggable="false" />
      <div className="Listing-info">
        <h2 className="Title">{name}</h2>
        <p className="Dates">{dates}</p>
        <p className="Location">{location}</p>
        <ul className="Pets" data-testid="pets-list">
          {pets.length > 0
            ? pets.map((pet, index) => {
                const petAvatarUrl = getPetAvatarUrl(pet.type);
                return (
                  <li className="Pet-count" key={index}>
                    {pet.count}
                    <img
                      src={petAvatarUrl}
                      className="Small-pet-icon"
                      alt="pet"
                      draggable="false"
                    />
                  </li>
                );
              })
            : ""}
        </ul>
      </div>
    </li>
  );
});

export default CarouselItem;

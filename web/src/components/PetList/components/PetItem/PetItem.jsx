import React from "react";

import "./PetItem.css";
import dog from "./assets/PetsPlaceholder/Dog.svg";
import cat from "./assets/PetsPlaceholder/Cat.svg";
import bird from "./assets/PetsPlaceholder/Bird.svg";
import fish from "./assets/PetsPlaceholder/Fish.svg";
import horse from "./assets/PetsPlaceholder/Horse.svg";
import reptile from "./assets/PetsPlaceholder/Reptile.svg";
import smallpet from "./assets/PetsPlaceholder/Smallpet.svg";

const PLACEHOLDERS = {
  dog,
  cat,
  bird,
  fish,
  horse,
  reptile,
  smallpet
};

const PetItem = ({ pet }) => {
  const { name, type, feeds } = pet;
  // const imageUrl = pet.imageUrl || dog;
  const imageUrl = PLACEHOLDERS[type.toLowerCase()] || dog;
  return (
    <div className="Pet-item">
      <div>
        <img src={imageUrl} className="Pet-image" alt="pet" />
      </div>
      <div>
        <div>
          <span className="Pet-details-label">Name: </span>
          <span>{name}</span>
        </div>
        <div>
          <span className="Pet-details-label">Animal Type: </span>
          <span>{type}</span>
        </div>
        <div>
          <span className="Pet-details-label">Number of feeds: </span>
          <span>{feeds}</span>
        </div>
      </div>
    </div>
  );
};

export default PetItem;

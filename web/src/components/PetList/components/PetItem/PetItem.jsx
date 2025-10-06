import React from "react";

import "./PetItem.css";
import dog from "./assets/PetsPlaceholder/Dog.svg";

const PetItem = ({ pet }) => {
  const { name, type, age, feeds } = pet;
  const imageUrl = pet.imageUrl || dog;
  return (
    <div className="Pet-item">
      <div className="Pet-image-container">
        <img src={imageUrl} className="Pet-image" alt={`Image of a ${type} named ${name}`} />
      </div>
      <div className="Pet-details">
        <div>
          <span className="Pet-details-label">Name: </span>
          <span>{name}</span>
        </div>
        <div>
          <span className="Pet-details-label">Animal Type: </span>
          <span>{type}</span>
        </div>
        <div>
          <span className="Pet-details-label">Age: </span>
          <span>{age} {age === 1 ? 'year' : 'years'} old</span>
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

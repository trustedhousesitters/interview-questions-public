import React from "react";

import "./PetItem.css";
import close from "./assets/close.svg";
import dog from "./assets/PetsPlaceholder/Dog.svg";

const PetItem = ({ pet, onDeleteClicked }) => {
  const { name, type, feeds } = pet;
  const imageUrl = pet.imageUrl || dog;
  return (
    <div className="pet-item">
      <div>
        <img src={imageUrl} className="pet-image" alt="pet" />
      </div>
      <div>
        <div>
          <span className="pet-details-label">Name: </span>
          <span>{name}</span>
        </div>
        <div>
          <span className="pet-details-label">Animal Type: </span>
          <span>{type}</span>
        </div>
        <div>
          <span className="pet-details-label">Number of feeds: </span>
          <span>{feeds}</span>
        </div>
      </div>
      <button className="delete-button" onClick={() => onDeleteClicked(pet)}>
        <img src={close} className="delete-icon" alt="delete" />
      </button>
    </div>
  );
};

export default PetItem;

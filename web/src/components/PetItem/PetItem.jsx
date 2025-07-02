import React from "react";
import { usePets } from "@/context/PetContext";
import "./PetItem.css";
import dog from "./assets/PetsPlaceholder/Dog.svg";

const PetItem = ({ pet }) => {
  const { dispatch } = usePets();
  const { name, type, feeds } = pet;
  const imageUrl = pet.imageUrl || dog;

  const handleDelete = () => {
    dispatch({ type: "REMOVE_PET", payload: pet.id });
  };

  return (
    <div className="Pet-item" data-testid="pet-item">
      <button className="Pet-delete-button" onClick={handleDelete} aria-label={`Delete ${name}`}>
        x
      </button>
      <div>
        <img src={imageUrl} className="Pet-image" alt={`Pet ${name}`} />
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

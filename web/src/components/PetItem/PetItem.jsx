import React from "react";
import "./PetItem.css";

const PetItem = ({ pet }) => {
  const { name, type, feeds, icon } = pet;
  
  return (
    <div className="Pet-item">
      <div>
        <img src={icon} className="Pet-image" alt="pet" />
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

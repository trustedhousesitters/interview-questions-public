import React from "react";
import { usePets } from "../../context/PetContext";
import PetItem from "../PetItem/PetItem";
import "./PetList.css";

const PetList = () => {
  const { petState } = usePets();

  if (!petState || petState.length === 0) {
    return <p className="Pets-empty">No pets available.</p>;
  }

  return (
    <>
      <h1 className="Pets-title">My Pets</h1>
      <div className="Pets-list">
        {petState.map((pet) => (
          <PetItem key={pet.id} pet={pet} />
        ))}
      </div>
    </>
  );
};

export default PetList;

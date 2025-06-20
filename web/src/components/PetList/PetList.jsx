import React from "react";
import PetItem from "./components/PetItem";
import "./PetList.css";

const PetList = () => {
  const pets = [];
  return (
    <>
      <h1 className="Pets-title">My Pets</h1>
      {pets.length > 1 && pets.map((pet) => <PetItem pet={pet} key={pet.id} />)}
    </>
  );
};

export default PetList;

import React from "react";
import { useSelector } from "react-redux";

import PetItem from "./components/PetItem";
import { getPets } from "./selectors";
import "./PetList.css";

const PetList = () => {
  const pets = useSelector(getPets);
  return (
    <>
      <h1 className="Pets-title">My Pets</h1>
      {pets.length > 1 && pets.map((pet) => <PetItem pet={pet} key={pet.id} />)}
    </>
  );
};

export default PetList;

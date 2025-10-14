import React from "react";
import { useEffect, useState } from "react";
import PetItem from "./components/PetItem";
import "./PetList.css";

const PetList = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch("/api/pets")
      .then((response) => response.json())
      .then((data) => setPets(data));
  }, []);

  return (
    <>
      <h1 className="Pets-title">My Pets</h1>
      {pets.map((pet) => (
        <PetItem key={pet.id} pet={pet} />
      ))}
    </>
  );
};

export default PetList;

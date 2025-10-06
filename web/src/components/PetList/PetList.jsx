import React, { useState, useEffect } from "react";
import "./PetList.css";

const PetList = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      const response = await fetch("/api/pets");
      const data = await response.json();
      setPets(data);
    };

    fetchPets();
  }, []);

  return (
    <>
      <h1 className="Pets-title">My Pets</h1>
    </>
  );
};

export default PetList;

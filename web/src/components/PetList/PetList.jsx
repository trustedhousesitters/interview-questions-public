import React, { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";
import PetItem from "./components/PetItem";
import "./PetList.css";

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      const response = await fetch("/api/pets");
      const data = await response.json();
      setPets(data);
      setLoading(false);
    };

    fetchPets();
  }, []);

  return (
    <>
      <h1 className="Pets-title">My Pets</h1>
      {loading && <LoadingSpinner size={25} />}
      {!loading && (
        <div className="pets-container">
          {pets.map((pet) => (
            <PetItem key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </>
  );
};

export default PetList;

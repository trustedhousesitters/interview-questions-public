import React from "react";
import { useEffect, useState } from "react";
import PetItem from "./components/PetItem";
import "./PetList.css";

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch("/api/pets");
        if (response.status === 404) {
          setPets([]);
          setError('No pets found');
          return;
        }
        if (!response.ok) {
          throw new Error("Failed to fetch pets");
        }
        const data = await response.json();
        setPets(data);
      } catch (e) {
        setError("Failed to load pets. Please try again later.");
      }
    };
    fetchPets();
  }, []);

  return (
    <>
      <h1 className="Pets-title">My Pets</h1>
      {error ? (
        <div role="alert" className="Pets-error">{error}</div>
      ) : null}
      {pets.map((pet) => (
        <PetItem key={pet.id} pet={pet} />
      ))}
    </>
  );
};

export default PetList;

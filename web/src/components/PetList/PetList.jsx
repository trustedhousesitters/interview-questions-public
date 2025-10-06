import React, { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";
import PetItem from "./components/PetItem";
import "./PetList.css";

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch("/api/pets");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setPets(data);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch pets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  return (
    <>
      <h1 className="Pets-title">My Pets</h1>
      {loading && <LoadingSpinner size={25} />}
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      {!loading && !error && (
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

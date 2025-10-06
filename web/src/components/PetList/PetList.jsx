import React, { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";
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
    </>
  );
};

export default PetList;

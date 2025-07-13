import React, { useEffect, useState } from "react";
import "./PetList.css";
import PetItem from "./components/PetItem/";

const PetList = () => {
  const [petData, setPetData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getPetData() {
      const url = "/api/pets";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        setPetData(json);
      } catch (error) {
        setError(error);
        console.error("fetch error:", error.message);
      }
    }
    getPetData();
  }, []);
  return (
    <>
      <div className="Wrapper">
        <h1 className="Pets-title">My Pets</h1>
        <ul className="Grid-wrapper">
          {error && (
            <p className="Error-text">
              An error has occurred retrieving pet data.
            </p>
          )}
          {petData.length > 0 &&
            petData.map((pet) => <PetItem pet={pet} key={pet.id} />)}
          {!error && petData.length === 0 && <p>Pets will appear here...</p>}
        </ul>
      </div>
    </>
  );
};

export default PetList;

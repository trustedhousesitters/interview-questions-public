import React from "react";
import PetItem from "./components/PetItem";
import "./PetList.css";

const PetList = ({ pets = [], error = null }) => {
  return (
    <>
      <h1 className="Pets-title">My Pets</h1>
      {error ? (
        <div role="alert" className="Pets-error">{error}</div>
      ) : null}
      <div role="list" className="Pets-list">
        {pets.map((pet) => (
          <PetItem key={pet.id} pet={pet} />
        ))}
      </div>
    </>
  );
};

export default PetList;

import React, { useState } from "react";
import "./PetList.css";

const PetList = () => {
  const [pets, setPets] = useState([]);

  return (
    <>
      <h1 className="Pets-title">My Pets</h1>
    </>
  );
};

export default PetList;

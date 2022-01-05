import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPet } from "./actions";

import PetItem from "./components/PetItem";
import { getPets } from "./selectors";
import "./PetList.css";

const PetList = () => {
  const [petName, setPetName] = useState(''); 
  const [petType, setPetType] = useState('');
  const pets = useSelector(getPets);
  const dispatch = useDispatch();

  const addPetName = (e) => {
    setPetName(e.target.value);
  };

  const addNewPet = (e) => {
    const newPet = {
      id: pets.length + 1,
      name: petName,
      type: petType,
      age: 99,
      feeds: 5,
    };
    dispatch(addPet(newPet));

    e.preventDefault();
    console.log(e.target.value);
  };

  return (
    <Fragment>
      <h1 className="Pets-title">My Pets</h1>
      <h3 onClick={addNewPet}>Add Pet</h3>

      <form onSubmit={addNewPet}>
          <input onChange={addPetName} name="petname" type="text" />
          <button type="submit">Add</button>
      </form>

      {pets.length > 1 && pets.map((pet) => <PetItem pet={pet} key={pet.id} />)}
    </Fragment>
  );
};

export default PetList;
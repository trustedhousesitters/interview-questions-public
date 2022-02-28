import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import add from "../../components/PetList/components/PetItem/assets/add.svg";
import PetItem from "./components/PetItem";
import { getPets } from "./selectors";
import "./PetList.css";
import { addPetItem } from "./actions";
import { generatePets } from "../../helpers/generatePets";

const PetList = () => {
  const pets = useSelector(getPets);
  const isOdd = pets.length % 2 !== 0;
  const dispatch = useDispatch();

  const handleOnClickAdd = () => {
    // In a real app this should use input forms instead
    const pet = generatePets(1)[0];

    dispatch(addPetItem(pet));
  };

  return (
    <Fragment>
      <h1 className="Pets-title">My Pets</h1>
      <button className="Add-button">
        <img
          src={add}
          className="Add-icon"
          alt="add"
          onClick={handleOnClickAdd}
        />
      </button>
      <div className="Pet-wrapper">
        {pets.length > 1 &&
          pets.map((pet) => <PetItem pet={pet} key={pet.id} />)}
        {isOdd && <div className="Pet-item dummy-pet" />}
      </div>
    </Fragment>
  );
};

export default PetList;

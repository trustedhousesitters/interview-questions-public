import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPet } from "./actions";
import { getPets } from "./selectors";
import PetItem from "./components/PetItem";
import Input from "./components/Input";
import Button from "./components/Button";
import "./PetList.css";

const PetList = () => {
    const [petName, setPetName] = useState(''); 
    const [petType, setPetType] = useState('');
    const [petAge, setPetAge] = useState(''); 
    const [petFeed, setPetFeed] = useState('');
  
    const pets = useSelector(getPets);
    const dispatch = useDispatch();

    const addPetName = e => {
        setPetName(e.target.value);
    };

    const addPetType = e => {
        setPetType(e.target.value);
    };

    const addPetAge = e => {
        setPetAge(e.target.value);
    };

    const addPetFeed = e => {
        setPetFeed(e.target.value);
    };

    const addNewPet = e => {
        const newPet = {
            id: pets.length + 1,
            name: petName,
            type: petType,
            age: petAge,
            feeds: petFeed,
        };

        dispatch(addPet(newPet));

        e.preventDefault();
    };

    return (
        <Fragment>
            <h1 className="Pets-title">My Pets</h1>
      
            <h3 onClick={addNewPet}>Add Pet</h3>

            <form onSubmit={addNewPet}>
                <label for="name">
                    <Input onChange={addPetName} id="name" name="petname" placeholder="Name" type="text" />
                </label>
                <label for="type">
                    <Input onChange={addPetType} id="type" name="pettype" placeholder="Type" type="text" />
                </label>
                <label for="age">
                    <Input onChange={addPetAge} id="age" name="petage" placeholder="Age" type="number" />
                </label>
                <label for="feed">
                    <Input onChange={addPetFeed} id="feed" name="petfeed" placeholder="Feed" type="number" />
                </label>
                
                <Button type="submit">Add Pet</Button>
            </form>

            {pets.length > 1 && pets.map((pet) => <PetItem pet={pet} key={pet.id} />)}
        </Fragment>
    );
};

export default PetList;
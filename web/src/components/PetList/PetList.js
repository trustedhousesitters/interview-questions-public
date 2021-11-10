import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import PetItem from './components/PetItem';
import AddPet from './components/AddPet';
import { getPets } from './selectors';
import './PetList.css';

const PetList = () => {
    const pets = useSelector(getPets);
    return (
        <Fragment>
            <AddPet />
            <h1 className="Pets-title">My Pets</h1>
            <div className="Pets-list">
                { pets.length 
                    ? pets.map(pet => <PetItem pet={pet} key={pet.id}/>) 
                    : <p>You have no pets! :(</p>
                }
            </div>
        </Fragment>
    );
};

export default PetList;

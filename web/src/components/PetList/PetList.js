import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import PetItem from './components/PetItem';
import { getPets } from './selectors';
import './PetList.css';

const PetList = () => {
    const pets = useSelector(getPets);
    return (
        <Fragment>
            <h1 className="Pets-title">My Pets</h1>
            { pets.length > 1 && pets.map(pet => <PetItem pet={pet} key={pet.id}/>) }
        </Fragment>
    );
};

export default PetList;

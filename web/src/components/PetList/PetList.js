import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';

import { getPets } from './selectors';

import PetItem from './components/PetItem';
import AddPet from './components/AddPet';

import './PetList.css';

const PetList = () => {
    const pets = useSelector(getPets);
    const [showAddPetsModal, setShowAddPetsModal] = useState(false);
    return (
        <Fragment>
            <div className="c-pet-list__header">
                <h1 className="c-pet-list__title">My Pets</h1>
                <button onClick={() => setShowAddPetsModal(true)}>
                    Add Pet
                </button>
            </div>
            <div className="c-pet-list__grid">
                { pets.length > 1 && pets.map(pet => <PetItem pet={pet} key={pet.id}/>) }
            </div>
            {showAddPetsModal && (
                <AddPet hideModal={() => setShowAddPetsModal(false)} />
            )}
        </Fragment>
    );
};

export default PetList;

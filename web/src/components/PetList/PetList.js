import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';

import PetItem from './components/PetItem';
import { getPets } from './selectors';
import './PetList.css';
import PetForm from './components/PetForm/PetForm';

const PetList = () => {
    const pets = useSelector(getPets);
    const [isAddPetFormVisible, setAddPetFormVisible] = useState(false);

    const showPetForm = () => {
        setAddPetFormVisible(true);
    };

    const hidePetForm = () => {
        setAddPetFormVisible(false);
    };

    return (
        <Fragment>
            <h1 className='Pets-title'>My Pets</h1>
            {isAddPetFormVisible ? (
                <PetForm onCancel={hidePetForm} />
            ) : (
                <button
                    className='Button'
                    onClick={showPetForm}
                    aria-label='Add new pet'
                >
                    Add pet
                </button>
            )}
            <div className='Pets-list'>
                {pets.length >= 1 &&
                    pets.map((pet) => <PetItem pet={pet} key={pet.id} />)}
            </div>
        </Fragment>
    );
};

export default PetList;

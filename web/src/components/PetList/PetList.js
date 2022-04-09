import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';

import PetItem from './components/PetItem';
import PetAddModal from './components/PetAddModal'
import { getPets } from './selectors';

import './PetList.css';

const PetList = () => {
    const [showAddModal, setShowAddModal] = useState(false)
    const pets = useSelector(getPets);

    return (
        <Fragment>
            <h1 className="Pets-title">My Pets</h1>
            <div className="Pets-container">
                {pets.length >= 1 &&  pets.map(pet => <PetItem pet={pet} key={pet.id} />) }
                <button className="Pets-add" data-testid="modal-add" onClick={() => setShowAddModal(true)}>+</button>
            </div>
            {showAddModal && <PetAddModal close={() => setShowAddModal(false)}/>}
           
        </Fragment>
    );
};

export default PetList;

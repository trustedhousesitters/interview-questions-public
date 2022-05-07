import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import PetItem from './components/PetItem';
import { getPets } from './selectors';
import './PetList.css';
import { Link } from 'react-router-dom';

const PetList = () => {
    const pets = useSelector(getPets);
    return (
        <Fragment>
            <div className="Pets-header">
                <h1 className="Pets-title">My Pets</h1>
                <Link to="/new-pet">
                    <button className="Button Pets-add-button">
                        NEW PET
                    </button>
                </Link>
            </div>
            <div className="Pets-list">
                { pets.length > 0 && pets.map(pet => <PetItem pet={pet} key={pet.id}/>) }
            </div>
        </Fragment>
    );
};

export default PetList;

import React from 'react';

import './PetItem.css';
import close from './assets/close.svg';
import dog from './assets/PetsPlaceholder/Dog.svg'

const PetItem = ({ pet, deletePet }) => {
    const { name, type, feeds } = pet;
    const imageUrl = pet.imageUrl || dog;
    return (
        <div className="Pet-item">
            <div>
                <img src={imageUrl} className="Pet-image" alt="pet" />
            </div>
            <div>
                <div>
                    <span className="Pet-details-label">Name: </span><span>{name}</span>
                </div>
                <div>
                    <span className="Pet-details-label">Animal Type: </span><span>{type}</span>
                </div>
                <div>
                    <span className="Pet-details-label">Number of feeds: </span><span>{feeds}</span>
                </div>
            </div>
            <button className="Delete-button" onClick={deletePet}>
                <img src={close} className="Delete-icon" alt="delete" />
            </button>
        </div>
    );
};

export default PetItem;

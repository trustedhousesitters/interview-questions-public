import React from 'react';

import './PetItem.css';
import close from './assets/close.svg';
import dog from './assets/PetsPlaceholder/Dog.svg'

const PetItem = ({ pet }) => {
    const { name, type, feeds } = pet;
    const imageUrl = pet.imageUrl || dog;
    return (
        <div className="Pet-item">
            <div>
                <img height="80" width="80" src={imageUrl} className="Pet-image" alt="pet" />
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
            <button className="Delete-button">
                <img src={close} className="Delete-icon" alt="delete" />
            </button>
        </div>
    );
};

export default PetItem;

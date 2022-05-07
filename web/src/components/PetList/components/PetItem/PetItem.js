import React from 'react';

import './PetItem.css';
import close from './assets/close.svg';
import dog from './assets/PetsPlaceholder/Dog.svg'
import { useDispatch } from 'react-redux';
import { deletePet } from '../../actions';

const PetItem = ({ pet }) => {
    const { id, name, type, feeds } = pet;
    const imageUrl = pet.imageUrl || dog;
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(deletePet(id))
    }

    return (
        <div className="Pet-item">
            <div>
                <img src={imageUrl} className="Pet-image" alt="pet" />
            </div>
            <div className="Pet-body">
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
            <button className="Delete-button" onClick={handleDelete}>
                <img src={close} className="Delete-icon" alt="delete" />
            </button>
        </div>
    );
};

export default PetItem;

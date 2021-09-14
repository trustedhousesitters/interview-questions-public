import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import './PetItem.scss';
import close from './assets/close.svg';
import dog from './assets/PetsPlaceholder/Dog.svg'
import { deletePetById } from "../../redux/actions";

const PetItem = ({ pet }) => {
    const dispatch = useDispatch()
    const { name, type, feeds } = pet;
    const imageUrl = pet.imageUrl || dog;

    const handleDelete = useCallback(() => {
        dispatch(deletePetById(pet.id))
    }, [dispatch, pet.id])

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
            <button className="Delete-button" onClick={handleDelete} data-testid="deleteButton">
                <img src={close} className="Delete-icon" alt="delete" />
            </button>
        </div>
    );
};

export default PetItem;

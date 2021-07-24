import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './PetItem.css';
import close from './assets/close.svg';
import dog from './assets/PetsPlaceholder/Dog.svg'
import { deletePet, setPetImageUrl } from '../../actions';

const PetItem = ({ pet }) => {
    const { name, type, feeds, id } = pet;
    const imageUrl = pet.imageUrl || dog;
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('https://random.dog/woof?include=jpg, jpeg').then(function(response) {
            return response.text();
          }).then(function(data) {
            const url = `https://random.dog/${data}`;
            dispatch(setPetImageUrl(url, id));
          }).catch(function() {
            console.log("random dog error");
          });
    }, []);

    const handleDelete = () => {
        dispatch(deletePet(id));
    };

    return (
        <div className="Pet-item-container">
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
                <button className="Delete-button" onClick={handleDelete}>
                    <img src={close} className="Delete-icon" alt="delete" />
                </button>
            </div>
        </div>

    );
};

export default PetItem;

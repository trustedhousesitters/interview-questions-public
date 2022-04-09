import React, {useEffect, useState, useCallback} from 'react';
import { useDispatch } from 'react-redux';

import './PetItem.css';
import close from './assets/close.svg';
import dog from './assets/PetsPlaceholder/Dog.svg'

const PetItem = ({ pet }) => {
    const { name, type, feeds, id } = pet;
    const [petImage, setPetImage] = useState(dog)

    const dispatch = useDispatch()

    const removeFromList = () => dispatch({ type: 'remove', petId: id })

    useEffect(() => {
        fetch('https://random.dog/woof.json?filter=mp4,webm').then(response => {
            if(response.status === 200) {
                return response.json()
            }
        })
        .then(image => setPetImage(image.url))
    }, [])


    return (
        <div className="Pet-item">
            <div>
                <img src={petImage} className="Pet-image" alt="pet" />
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
            <button className="Delete-button" onClick={() => removeFromList()} data-testid="delete">
                <img src={close} className="Delete-icon" alt="delete" />
            </button>
        </div>
    );
};

export default PetItem;

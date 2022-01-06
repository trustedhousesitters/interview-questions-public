import React from 'react';
import {removePet} from "../../actions";
import {useSelector, useDispatch} from "react-redux";
import Button from "../../components/Button";

import './PetItem.css';
import close from './assets/close.svg';
import dog from './assets/PetsPlaceholder/Dog.svg'

const PetItem = ({ pet }) => {

    const { name, type, feeds, id } = pet;
    const imageUrl = pet.imageUrl || dog;

    const dispatch = useDispatch();
    const pets = useSelector(state => state.appReducer);

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

            <Button onClick={() => dispatch(removePet(id))} className="Delete-button">
                <img src={close} className="Delete-icon" alt="delete" />
            </Button>
        </div>
    );
};

export default PetItem;

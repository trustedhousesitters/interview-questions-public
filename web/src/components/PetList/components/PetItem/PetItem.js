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
    //const pets = useSelector(state => state.appReducer);

    return (
        <div className="Pet-item">

            <div className="Pet-item__content">
                <div className="Pet-item__header">
                    <Button onClick={() => dispatch(removePet(id))} className="Delete-button">
                        <img src={close} className="icon--delete" alt="delete" />
                    </Button>
                </div>
                <div className="Pet-item__inner">
                    <img src={imageUrl} className="Pet-image" alt="pet" />

                    <div className="Pet-item__info">
                        <ul>
                            <li><span className="Pet-details-label">Name: </span><span>{name}</span></li>
                            <li><span className="Pet-details-label">Animal Type: </span><span>{type}</span></li>
                            <li><span className="Pet-details-label">Number of feeds: </span><span>{feeds}</span></li>
                        </ul>
                    </div>

                    <div className="Pet-item__footer">
                        <Button onClick={() => dispatch(removePet(id))} theme="primary">
                            Remove Pet
                        </Button>
                    </div>
                </div>
            </div>

            {/*
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
        */}
        </div>
    );
};

export default PetItem;

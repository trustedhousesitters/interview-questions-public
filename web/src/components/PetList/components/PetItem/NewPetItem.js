import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import './PetItem.css';
import { addPet } from '../../actions';

const NewPetItem = () => {
    const dispatch = useDispatch();

    const petNameRef = useRef();
    const petTypeRef = useRef();
    const petFeedsNumberRef = useRef();
    const formRef = useRef();

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddNewPet = e => {
        e.preventDefault();

        const name = petNameRef.current.value.trim();
        if (name) {
            const newPet = {
                id: Date.now().toString(36) + Math.random().toString(36).substr(2), // generating simple and unique id
                name,
                type: petTypeRef.current.value.trim(),
                feeds: petFeedsNumberRef.current.value.trim()
            };
            // Reset form and show success message for 2 sec
            dispatch(addPet(newPet));
            setSuccessMessage('New pet is added!');
            formRef.current.reset();
            setTimeout(() => {
                setSuccessMessage('');
            }, 2000);
        } else {
            // Show error message for 2 sec
            setErrorMessage('Name fields is required!');
            setTimeout(() => {
                setErrorMessage('');
            }, 2000);
        }
    };

    return (
        <div className="Pet-item">
            <div className="New-pet-icon">
                <span>New</span>
            </div>
            <form ref={formRef}>
                <div>
                    <label className="Pet-details-label" htmlFor="pet-name">Name: </label>
                    <input ref={petNameRef} name="pet-name" id="pet-name"/>
                </div>
                <div>
                    <label className="Pet-details-label" htmlFor="pet-type">Animal Type: </label>
                    <input ref={petTypeRef} name="pet-type" id="pet-type"/>
                </div>
                <div>
                    <label className="Pet-details-label" htmlFor="pet-feeds-number">Number of feeds: </label>
                    <input ref={petFeedsNumberRef} name="pet-feeds-number" id="pet-feeds-number"/>
                </div>
            </form>
            <button className="Add-button" type="submit" onClick={handleAddNewPet}>
                Add
            </button>
            { successMessage &&
                <span className="Add-pet-success">
                    {successMessage}
                </span>
            }
            { errorMessage &&
                <span className="Add-pet-error">
                    {errorMessage}
                </span>
            }
        </div>
    );
};

export default NewPetItem;

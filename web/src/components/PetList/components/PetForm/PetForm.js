import React from 'react';

import './PetForm.css';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addNewPet } from '../../reducers';

const PetForm = ({ onCancel }) => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const addPet = (pet) => {
        const addNewPetThunk = addNewPet(pet);
        dispatch(addNewPetThunk);
        // In future this might be another dedicated method, but for now it's the same behaviour so we call it
        onCancel();
    };

    return (
        <form onSubmit={handleSubmit(addPet)} className='Pet-form'>
            <h2 className='Pet-form-title'>Add a new pet</h2>
            <div>
                <label className='Pet-form-label' htmlFor='name'>
                    Name
                </label>
                <input
                    type='text'
                    id='name'
                    {...register('name', { required: true })}
                />
            </div>
            <div>
                <label className='Pet-form-label' htmlFor='type'>
                    Animal Type
                </label>
                <input
                    type='text'
                    id='type'
                    {...register('type', { required: true })}
                />
            </div>
            <div>
                <label className='Pet-form-label' htmlFor='feeds'>
                    Number of feeds
                </label>
                <input
                    type='number'
                    id='feeds'
                    {...register('feeds', {
                        required: true,
                        valueAsNumber: true,
                    })}
                />
            </div>
            <div>
                <label className='Pet-form-label' htmlFor='age'>
                    Age
                </label>
                <input
                    type='number'
                    id='age'
                    {...register('age', { valueAsNumber: true })}
                />
            </div>
            <button
                className='Submit-button Button'
                aria-label='Save new pet'
                type='submit'
            >
                Add pet
            </button>
            <button
                className='Cancel-button Button'
                aria-label='Cancel adding pet'
                type='button'
                onClick={onCancel}
            >
                Cancel
            </button>
        </form>
    );
};

export default PetForm;

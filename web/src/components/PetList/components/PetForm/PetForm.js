// @ts-check
import React, { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import './PetForm.css';

import { addPet } from '../../../../features/pets/petSlice';
import { buildPet } from '../../../../helpers/pets';

const AddPetForm = () => {
  const dispatch = useDispatch();

  // Taking the low cost approach here. Perhaps a form library or placing
  // the state in Redux would be an impovement.
  const [name, setName] = useState('');
  const [animalType, setAnimalType] = useState('');

  return (
    <form
      className="Form-form"
      data-testid='petform'
      onSubmit={(e) => {
        e.preventDefault();

        const pet = buildPet({
          id: nanoid(),
          name,
          type: animalType,
        });

        dispatch(addPet(pet));

        setName('')
        setAnimalType('')
      }}
    >
      <h2 className="Form-title">Add Pet</h2>

      <div>
        <label className="Form-label" htmlFor="name">
          <span>Name</span>
        </label>
        <input
          className="Form-text-input"
          onChange={e => setName(e.target.value)}
          value={name}
          id="name"
          data-testid="name"
          type="text"
          required
          minLength={2}
          maxLength={30}
          />
      </div>

      <div>
        <label className="Form-label" htmlFor="animal-type">
          <span>Animal Type</span>
        </label>
        <input
          className="Form-text-input"
          onChange={e => setAnimalType(e.target.value)}
          value={animalType}
          data-testid="animaltype"
          id="animal-type"
          type="text"
          required
          minLength={2}
          maxLength={30}
        />
      </div>

      <button 
      data-testid="form-submit"
      className="Form-add-button" 
      type="submit">
        Add Pet
      </button>
    </form>
  );
};

export default AddPetForm;

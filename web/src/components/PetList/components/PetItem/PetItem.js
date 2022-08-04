// @ts-check
import React from 'react';
import { useDispatch } from 'react-redux';

import './PetItem.css';
import dog from './assets/PetsPlaceholder/Dog.svg';

import { removePetById } from '../../../../features/pets/petSlice';

/** @typedef { import("../../../../features/pets/pet").Pet } Pet */

/**
 * @param {{ pet: Pet }} props
 */
const PetItem = ({ pet }) => {
  const dispatch = useDispatch();
  const { id, name, type, feeds, imageUrl = dog } = pet;

  return (
    <div className="Pet-item" data-testid="pet-item">
      <div>
        <img height="80" width="80" src={imageUrl} className="Pet-image" alt="pet" />
      </div>
      <div>
        <div>
          <span className="Pet-details-label">Name: </span>
          <span>{name}</span>
        </div>
        <div>
          <span className="Pet-details-label">Animal Type: </span>
          <span>{type}</span>
        </div>
        <div>
          <span className="Pet-details-label">Number of feeds: </span>
          <span>{feeds}</span>
        </div>
      </div>
      <button className="Delete-button" type="button" onClick={() => dispatch(removePetById(id))}>
        <span className="Delete-button-text">Remove {name}</span>
      </button>
    </div>
  );
};

export default PetItem;

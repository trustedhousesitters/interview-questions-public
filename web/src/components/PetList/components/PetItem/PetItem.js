// @ts-check
import React from 'react';

import './PetItem.css';
import dog from './assets/PetsPlaceholder/Dog.svg';

import { removePetById } from '../../../../features/pets/petSlice';

/**
 * Our main pet object
 * @typedef {Object} Pet
 * @property {number} id - The unique ID for the Pet
 * @property {string} name - The name of the Pet
 * @property {string} type - Animal classification. eg Dog, Cat, etc.
 * @property {number} feeds - How many times the pet has been fed
 * @property {string} [imageUrl] - A url to the image of the Pet
 */

/**
 * @param {{ dispatch: any; pet: Pet }} props
 * @returns {JSX.Element}
 */
const PetItem = ({ dispatch, pet }) => {
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
      <button
        className="Delete-button"
        type="button"
        onClick={() => dispatch(removePetById(id))}
      >
        <span className="Delete-button-text">Remove {name}</span>
      </button>
    </div>
  );
};

export default PetItem;

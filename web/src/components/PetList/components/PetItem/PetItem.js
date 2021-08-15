import React from 'react';
import { useDispatch } from 'react-redux';

import './PetItem.css';
import close from './assets/close.svg';
import dog from './assets/PetsPlaceholder/Dog.svg';

import { DELETE_ITEM } from '../../../../constants';

const PetItem = ({ pet }) => {
  const dispatch = useDispatch();
  const { id, name, type, feeds } = pet;
  const imageUrl = pet.imageUrl || dog;

  return (
    <div className="Pet-item">
      <div>
        <img src={imageUrl} className="Pet-image" alt="pet" />
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
      <button className="Delete-button">
        <img
          src={close}
          className="Delete-icon"
          alt="delete"
          onClick={() => dispatch({ type: DELETE_ITEM, payload: id })}
        />
      </button>
    </div>
  );
};

export default PetItem;

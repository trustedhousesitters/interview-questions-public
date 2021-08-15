import React from 'react';
import { useDispatch } from 'react-redux';
import { DELETE_ITEM } from '../../constants';
import close from '../../assets/close.svg';
import dog from '../../assets/Dog.svg';
import './PetItem.css';

const PetItem = ({ pet }) => {
  const dispatch = useDispatch();
  const { id, name, type, feeds } = pet;
  const imageUrl = pet.imageUrl || dog;

  return (
    <div className="Pet-item">
      <div>
        <img
          src={imageUrl}
          style={{ borderRadius: 40 }}
          className="Pet-image"
          alt="pet"
          width="80"
          height="80"
        />
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

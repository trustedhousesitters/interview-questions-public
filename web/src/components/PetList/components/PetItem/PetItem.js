import React from 'react';
import styled from 'styled-components';

import './PetItem.css';
import close from './assets/close.svg';
import dog from './assets/PetsPlaceholder/Dog.svg'

const StyledPetItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid 1px #D5D5D9;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.06);
  margin-bottom: 10px;
  padding: 20px;
  margin: 0 0 10px;
  flex: 1 1 100%;

  @media (min-width: 768px) {
    flex: 0 1 42%;
    margin: 0 5px 10px;
  }

  @media (min-width: 1024px) {
    flex: 0 1 25%;
  }
`;

const PetItem = ({ pet, removeItem }) => {
    const { name, type, feeds } = pet;
    const imageUrl = pet.imageUrl || dog;
    const deleteItem = () => removeItem(pet.id);
    return (
        <StyledPetItems>
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
            <button className="Delete-button" onClick={deleteItem}>
                <img src={close} className="Delete-icon" alt="delete" />
            </button>
        </StyledPetItems>
    );
};

export default PetItem;

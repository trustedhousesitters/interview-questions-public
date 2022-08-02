import React, { Fragment } from 'react';

import PetItem from './components/PetItem';

import './PetList.css';

const PetList = ({ dispatch, pets }) => {
  return (
    <Fragment>
      <h1 className="Pets-title">My Pets</h1>

      {pets.length === 0 ? (
        <div className="Pets-no-pets" data-testid="pet-list-empty">
          <h2>No Pets</h2>
        </div>
      ) : (
        <div className="Pets-container">
          {pets.map((pet) => (
            <PetItem dispatch={dispatch} pet={pet} key={pet.id} />
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default PetList;

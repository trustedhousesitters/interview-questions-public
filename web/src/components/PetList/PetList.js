// @ts-check
import React, { Fragment, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { selectPets } from '../../features/pets/petSlice';
import PetItem from './components/PetItem';

import './PetList.css';

const PetList = () => {
  const pets = useSelector(selectPets);
  
  /** @type {React.MutableRefObject<HTMLDivElement|null>} */
  const noPetsText = useRef(null);

  useEffect(() => {
    if (pets.length === 0) {
      noPetsText?.current?.focus();
    }
  }, [pets.length]);

  return (
    <Fragment>
      <h1 className="Pets-title">My Pets</h1>

      {pets.length === 0 ? (
        <div className="Pets-no-pets" ref={noPetsText} tabIndex={-1} data-testid="pet-list-empty">
          <h2>You don't currently have any pets.</h2>
        </div>
      ) : (
        <div className="Pets-container">
          {pets.map((pet) => (
            <PetItem pet={pet} key={pet.id} />
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default PetList;

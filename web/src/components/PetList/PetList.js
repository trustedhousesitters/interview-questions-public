import React, { Fragment, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import PetItem from './components/PetItem';
import { getPets } from './selectors';

import './PetList.css';

const PetList = () => {
  const pets = useSelector(getPets);

  const [petName, setPetName] = useState('');

  const handleOnSubmit = e => {
    e.preventDefault();
    console.log('Add addPet dispatch here');
  };

  const handleOnChange = e => {
    setPetName(e.target.value);
  };

  return (
    <Fragment>
      <h1 className="Pets-title">My Pets</h1>
      <div className="Pets-add-pet">
        <form onSubmit={handleOnSubmit}>
          <input value={petName} onChange={handleOnChange} />
          <button type="submit">+</button>
        </form>
      </div>
      <div className="Pets-content">
        {pets.length > 1 && pets.map(pet => <PetItem pet={pet} key={pet.id} />)}
      </div>
    </Fragment>
  );
};

export default PetList;

import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import PetItem from '../PetItem';
import { getPets } from './selectors';
import './PetList.css';
import AddItem from '../AddItem';

const PetList = () => {
  const pets = useSelector(getPets);

  return (
    <Fragment>
      <AddItem />
      <h1 className="Pets-title">My Pets</h1>
      <div className="Pets-list">
        {pets.length ? (
          pets.map((pet) => <PetItem pet={pet} key={pet.id} />)
        ) : (
          <div>No results</div> // Label if no results available, good UX?
        )}
      </div>
    </Fragment>
  );
};

export default PetList;

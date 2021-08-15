import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import PetItem from './components/PetItem';
import { getPets } from './selectors';
import './PetList.css';
import AddItem from './components/AddItem/AddItem';

const PetList = () => {
  const pets = useSelector(getPets);

  console.log(pets);

  return (
    <Fragment>
      <AddItem />
      <h1 className="Pets-title">My Pets</h1>

      {pets.length ? (
        pets.map((pet) => <PetItem pet={pet} key={pet.id} />)
      ) : (
        <div>No results</div>
      )}
    </Fragment>
  );
};

export default PetList;

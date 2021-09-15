import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';

import PetItem from './components/PetItem';
import { getPets } from './redux/selectors';
import './PetList.scss';
import add from './assets/add.svg';
import AddPetModal from './components/AddPetModal/AddPetModal';

const PetList = () => {
  const pets = useSelector(getPets);
  const [addPetModalOpen, setIsAddPetModalOpen] = useState(false);

  const openModal = () => {
    setIsAddPetModalOpen(true);
  };

  const closeModal = () => {
    setIsAddPetModalOpen(false);
  };

  return (
    <Fragment>
      <div className="Title-bar">
        <h1 className="Pets-title">My Pets</h1>

        <button className="Add-button" onClick={openModal}>
          <img src={add} className="Add-icon" alt="Add" />
        </button>
      </div>
      <div className="Pets-list">
        {pets.length > 0 &&
          pets.map((pet) => <PetItem pet={pet} key={pet.id} />)}
      </div>
      <AddPetModal open={addPetModalOpen} onRequestClose={closeModal} />
    </Fragment>
  );
};

export default PetList;

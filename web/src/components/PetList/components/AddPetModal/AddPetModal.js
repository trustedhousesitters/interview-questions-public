import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';

import './AddPetModal.scss';
import { createPet } from '../../redux/actions';
import { PET_TYPES } from '../../../../helpers/generatePets';

const AddPetModal = ({ open = false, onRequestClose, onSubmit }) => {
  Modal.setAppElement('body');

  const dispatch = useDispatch();
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [petFeed, setPetFeed] = useState('');

  const handlePetName = (e) => {
    setPetName(e.target.value);
  };

  const handlePetType = (e) => {
    setPetType(e.target.value);
  };

  const handlePetFeed = (e) => {
    const { value } = e.target;
    setPetFeed(value ? parseInt(value, 10) : '');
  };

  const handleClose = () => {
    setPetName('');
    setPetType('');
    setPetFeed('');

    onRequestClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (petName) {
      dispatch(createPet(petName, petType, petFeed));

      handleClose();
    }
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={handleClose}
      contentLabel="Add your pet modal"
      className="Add-pet-modal"
    >
      <div className="Modal-header">
        <h4 className="Modal-title">Add your pet</h4>
        <button className="Modal-cancel-button" onClick={handleClose}>
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="Form-field">
          <label htmlFor="petName" className="Form-label">
            Pets name
          </label>
          <input
            id="petName"
            onChange={handlePetName}
            className="Form-input"
            type="text"
          />
        </div>
        <div className="Form-field">
          <label htmlFor="petType" className="Form-label">
            Animal type
          </label>
          <select id="petType" onChange={handlePetType} className="Form-input">
            <option value="" key="default">
              select an option
            </option>
            {PET_TYPES.map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="Form-field">
          <label htmlFor="petFeed" className="Form-label">
            Number of feeds
          </label>
          <select id="petFeed" onChange={handlePetFeed} className="Form-input">
            <option value="" key="default">
              select an option
            </option>
            {Array.from(Array(6)).map((_, i) => {
              const feeds = i + 1;

              return (
                <option value={feeds} key={feeds}>
                  {feeds}
                </option>
              );
            })}
          </select>
        </div>
        {petName && (
          <div className="Form-field">
            <button
              type="submit"
              className="Submit-pet-button"
              data-testid="AddButton"
            >
              Add
            </button>
          </div>
        )}
      </form>
    </Modal>
  );
};

export default AddPetModal;

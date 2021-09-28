import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addPet } from '../../actions';
import Modal from '../../../Modal';

import './AddPet.css';

const AddPet = ({ hideModal }) => {

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [feeds, setFeeds] = useState('');
  const [age, setAge] = useState('');

  const onConfirm = useCallback(e => {
    e.preventDefault();
    dispatch(addPet({ name, type, feeds, age }));
    hideModal();
  }, [dispatch, name, type, feeds, age, hideModal]);

  const formInputs = [{
    id: 'name',
    label: 'Pet Name',
    onChange: setName,
    value: name,
    required: true,
  }, {
    id: 'type',
    label: 'Animal Type',
    onChange: setType,
    value: type,
  }, {
    id: 'feeds',
    label: 'Number of Feeds',
    onChange: setFeeds,
    value: feeds,
    type: 'number',
  }, {
    id: 'age',
    label: 'Pet Age',
    onChange: setAge,
    value: age,
    type: 'number',
  }];

  return (
    <Modal
      className="c-add-pet"
      visible
      hideModal={hideModal}
    >
      {(modalFooter) => (
        <form onSubmit={onConfirm}>
          {formInputs.map(input => (
            <div
              key={input.id}
              className="c-add-pet__row"
            >
              <label htmlFor={input.id}>{input.label}{input.required ? '*' : ''}</label>
              <input
                id={input.id}
                type={input.type}
                required={input.required}
                onChange={e => input.onChange(e.target.value)}
                value={input.value}
              />
            </div>
          ))}
          {modalFooter}
        </form>
      )}
    </Modal>
  );
};

export default AddPet;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ADD_ITEM, PET_TYPES } from '../../../../constants';

const AddItem = () => {
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();

  console.log(inputs);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, type } = inputs;

    // validation, do not dispatch if no name/all spaces/no type
    if (!name || !name.trim() || !type) {
      setInputs({ ...inputs, name: '' });
      return;
    }

    dispatch({ type: ADD_ITEM, payload: { name: name.trim(), type } });
    setInputs({ ...inputs, name: '' });
    // reset name after dispatch, dropdown no longer -- select -- so can stay as is
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="type">Type: </label>
      <select onChange={handleChange} name="type" defaultValue="">
        <option disabled hidden value="">
          -- select --
        </option>
        {PET_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        id="name"
        name="name"
        value={inputs.name || ''}
        onChange={handleChange}
      />
      <input type="submit" value="Add Pet"></input>
    </form>
  );
};

export default AddItem;

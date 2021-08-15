import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ADD_ITEM, PET_TYPES, BASE_URL } from '../../constants';
import { generateNumber } from '../../helpers';

const AddItem = () => {
  const [inputs, setInputs] = useState({});
  const [imageUrl, setImageUrl] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchImage();
  }, [inputs]);

  const fetchImage = async () => {
    const imageName = await fetch(`${BASE_URL}/woof?include=jpg`);
    const imageUrl = await imageName.text();
    setImageUrl(`${BASE_URL}/${imageUrl}`);
  };

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

    dispatch({
      type: ADD_ITEM,
      payload: {
        name: name.trim(),
        type,
        // quick fix to generate age/feeds numbers, no input yet
        age: generateNumber(15),
        feeds: generateNumber(6, 1),
        imageUrl,
      },
    });
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

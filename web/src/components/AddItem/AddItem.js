import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ADD_ITEM, PET_TYPES, BASE_URL } from '../../constants';
import './AddItem.css';

const AddItem = () => {
  const [inputs, setInputs] = useState({});
  const [imageUrl, setImageUrl] = useState();
  const dispatch = useDispatch();

  // import as useFetch custom hook
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
    const { name, type, age, feeds } = inputs;
    const noSpacesName = name.trim();

    // validation, do not dispatch if no name/all spaces/no type, age or feeds
    // add error handling, messages under inputs
    if (!name || !noSpacesName || !type || !feeds) {
      setInputs({ ...inputs, name: '', age: '', feeds: '' });
      return;
    }

    dispatch({
      type: ADD_ITEM,
      payload: {
        name: noSpacesName,
        type,
        age,
        feeds,
        imageUrl,
      },
    });
    // reset name after dispatch, dropdown no longer -- select -- so can stay as is
    setInputs({ ...inputs, name: '', age: '', feeds: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="AddItem-form">
      <div className="AddItem-labelDataGroup">
        <label htmlFor="type" className="AddItem-label">
          Type:{' '}
        </label>
        <select
          defaultValue=""
          name="type"
          onChange={handleChange}
          className="AddItem-select"
        >
          <option disabled hidden value="">
            -- select --
          </option>
          {PET_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="AddItem-labelDataGroup">
        <label htmlFor="name" className="AddItem-label">
          Name:{' '}
        </label>

        <input
          id="name"
          name="name"
          onChange={handleChange}
          className="AddItem-input"
          type="text"
          value={inputs.name || ''}
        />
      </div>

      <div className="AddItem-labelDataGroup">
        <label htmlFor="age" className="AddItem-label">
          Age:{' '}
        </label>

        <input
          id="age"
          max={99}
          min={0}
          name="age"
          onChange={handleChange}
          className="AddItem-input"
          type="number"
          value={inputs.age || ''}
        />
      </div>

      <div className="AddItem-labelDataGroup">
        <label htmlFor="name" className="AddItem-label">
          Feeds:{' '}
        </label>

        <input
          id="feeds"
          max={99}
          min={0}
          name="feeds"
          onChange={handleChange}
          className="AddItem-input"
          type="number"
          value={inputs.feeds || ''}
        />
      </div>

      <input className="AddItem-button" type="submit" value="Add a Pet"></input>
    </form>
  );
};

export default AddItem;

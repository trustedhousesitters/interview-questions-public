import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addPet } from '../PetList/reducers';

import './AddPet.css';

export const AddPet = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [feeds, setFeeds] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleOnSubmit = async e => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const json = await (
        await fetch('https://random.dog/woof.json?filter=mp4,webm')
      ).json();
      const { url: imageUrl } = json;

      dispatch(addPet({ feeds, name, imageUrl, type }));
    } catch (e) {
      console.error('There was an error fetching an image for this pet', e);
    }

    setIsLoading(false);
    setName('');
  };

  const handleNameOnChange = e => {
    setName(e.target.value);
  };

  const handleTypeOnChange = e => {
    setType(e.target.value);
  };

  const handleFeedsOnChange = e => {
    setFeeds(e.target.value);
  };

  return (
    <div className="Add-Pet">
      <h1 className="Add-Pet-title">Add Pet</h1>
      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <form onSubmit={handleOnSubmit}>
          <label htmlFor="add-pet-name-input">Name</label>
          <input
            id="add-pet-name-input"
            value={name}
            onChange={handleNameOnChange}
          />
          <label htmlFor="add-pet-type-input">Type</label>
          <input
            id="add-pet-type-input"
            value={type}
            onChange={handleTypeOnChange}
          />
          <label htmlFor="add-pet-feeds-input">Number of feeds</label>
          <input
            type="number"
            step="1"
            id="add-pet-feeds-input"
            value={feeds}
            onChange={handleFeedsOnChange}
          />
          <button type="submit">+</button>
        </form>
      )}
    </div>
  );
};
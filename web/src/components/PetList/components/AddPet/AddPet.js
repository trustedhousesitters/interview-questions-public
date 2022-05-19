import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addPet } from '../../reducers';

export const AddPet = () => {
  const [petName, setPetName] = useState('');
  const dispatch = useDispatch();

  const handleOnSubmit = async e => {
    e.preventDefault();

    const json = await (
      await fetch('https://random.dog/woof.json?filter=mp4,webm')
    ).json();
    const { url } = json;

    dispatch(addPet({ name: petName, imageUrl: url }));
    setPetName('');
  };

  const handleOnChange = e => {
    setPetName(e.target.value);
  };

  return (
    <div className="Pets-add-pet">
      <form onSubmit={handleOnSubmit}>
        <input value={petName} onChange={handleOnChange} />
        <button type="submit">+</button>
      </form>
    </div>
  );
};

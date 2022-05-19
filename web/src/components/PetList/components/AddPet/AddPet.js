import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addPet } from '../../reducers';

export const AddPet = () => {
  const [petName, setPetName] = useState('');
  const dispatch = useDispatch();

  const handleOnSubmit = e => {
    e.preventDefault();
    dispatch(addPet(petName));
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

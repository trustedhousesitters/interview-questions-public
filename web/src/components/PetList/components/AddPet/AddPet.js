import { useState } from 'react';

export const AddPet = () => {
  const [petName, setPetName] = useState('');

  const handleOnSubmit = e => {
    e.preventDefault();
    console.log('Add addPet dispatch here');
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

import React, { useState }  from 'react';
import './index.css';

const AddPet = ({ addPet }) => {
  const [name, setName] = useState('')
  return (
    <>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <button disabled={!name.length} onClick={() => {
        setName('')
        return addPet(name)
      }}>Add pet</button>
    </>
  );
};

export default AddPet;

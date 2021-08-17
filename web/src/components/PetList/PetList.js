import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import PetItem from './components/PetItem';
import { getPets } from './selectors';
import './PetList.css';

const StyledItems = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 0 20px;
`;

const StyledForm = styled.form`
  padding: 10px 5px;
`;

const PetList = () => {
    const pets = useSelector(getPets);
    const [petsList, setPetsList] = useState(pets);
    const [newPetItem, setPetItem] = useState('');
    const fetchData = async () => {
      try {
        const response = await fetch('https://github.com/AdenFlorian/random.dog', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } catch (error) {
        throw new Error('Failed to fetch data');
      }
    };

    const removeItem = id => {
    const newPetList = petsList.filter(items => items.id !== id);
      setPetsList(newPetList);
    };
    const newlyAddedItem = {id: petsList.length + 10, name: newPetItem, type: 'Animal', feeds: 2};
    const listItems = [...petsList, newlyAddedItem];
    const handleChange = event => setPetItem(event.target.value);
    const addNewPetItem = e => {
      e.preventDefault();
      setPetsList(listItems);
      setPetItem('');
      // fetchData(); I couldn't fetch the data due to a CORS issue.
    };
    return (
        <Fragment>
            <h1 className="Pets-title">My Pets</h1>
            <StyledForm>
              <input type="text" id="name" name="name" value={newPetItem} onChange={handleChange} />
              <button onClick={addNewPetItem}>Submit</button>
            </StyledForm>
            <StyledItems>
            { pets.length > 1 && petsList.map(pet => <PetItem pet={pet} key={pet.id} removeItem={removeItem} />) }
            </StyledItems>
        </Fragment>
    );
};

export default PetList;

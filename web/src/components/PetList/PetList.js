import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PetItem from './components/PetItem';
import AddPet from './components/AddPet';
import { getPets } from './selectors';
import Container from '../Grid/GridContainer'
import Column from '../Grid/GridColumn'
import './PetList.css';
import { deletePet, addPet } from './actions'
const PetList = () => {
    const pets = useSelector(getPets);
    const dispatch = useDispatch()
    return (
        <Fragment>
            <AddPet data-testid="add-pet" addPet={name => {
              console.log('name', name)
              return dispatch(addPet(name))}}/>
            <h1 className="Pets-title">My Pets</h1>
            <Container>
            { pets.length > 1 && pets.map(pet =>
              <Column key={pet.id}><PetItem deletePet={() => dispatch(deletePet(pet.id))} pet={pet} /></Column>
            ) }
            </Container>
        </Fragment>
    );
};

export default PetList;

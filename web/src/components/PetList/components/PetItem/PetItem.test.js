import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { generatePets } from '../../../../helpers/generatePets';
import PetItem from './PetItem';
import PetList from '../../PetList';
import { Provider } from 'react-redux';
import { store } from '../../../../app/store';


const pets = generatePets();

test('renders pet image', () => {
    const { getByRole } = render(
        <Provider store={store}>
            <PetItem pet={pets[0]} />
        </Provider>
    );
    expect(getByRole('img', { name: 'pet' })).toBeInTheDocument()
});

test('renders pet name', () => {
    const { getByText } = render(
        <Provider store={store}>
            <PetItem pet={pets[0]} />
        </Provider>
    );
    expect(getByText(/Name/)).toBeInTheDocument();
    expect(getByText(pets[0].name)).toBeInTheDocument();
});

test('renders pet animal type', () => {
    const { getByText } = render(
        <Provider store={store}>
            <PetItem pet={pets[0]} />
        </Provider>
    );
    expect(getByText(/Animal Type/)).toBeInTheDocument();
    expect(getByText(pets[0].type)).toBeInTheDocument();
});

test('renders number of feeds', () => {
    const { getByText } = render(
        <Provider store={store}>
            <PetItem pet={pets[0]} />
        </Provider>
    );
    expect(getByText(/Number of feeds/)).toBeInTheDocument();
    expect(getByText(`${pets[0].feeds}`)).toBeInTheDocument();
});

test('should removes item from list', () => {
    render(
         <Provider store={store}>
             <PetList />
         </Provider>
     );
 
     const currentList = screen.getByRole('heading').nextSibling.children
 
     //last element will be the add button
     const numberOfPets = currentList.length - 1
     
     fireEvent.click(screen.getAllByTestId('delete')[0])
 
     const newList = screen.getByRole('heading').nextSibling.children
     const newNumberOfPets = newList.length - 1
 
     expect(newNumberOfPets).toEqual(numberOfPets - 1)
     
 })

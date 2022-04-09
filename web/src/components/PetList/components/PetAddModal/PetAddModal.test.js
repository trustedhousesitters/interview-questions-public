import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../../app/store';
import PetList from '../../PetList';

test('should not add to list and highlight name if none givene', () => {
    render(
         <Provider store={store}>
             <PetList />
         </Provider>
     );

     const currentList = screen.getByRole('heading').nextSibling.children

     //last element will be the add button
     const numberOfPets = currentList.length - 1

    //open add modal
    fireEvent.click(screen.getByTestId('modal-add'))
    //press add
    fireEvent.click(screen.getByTestId('add'))

    const newList = screen.getByRole('heading').nextSibling.children
    const newNumberOfPets = newList.length - 1

    expect(screen.getByText('Name*:').classList.contains('highlight')).toBe(true)
    expect(newNumberOfPets).toEqual(numberOfPets)
 })


 test('should add item to list', () => {
    render(
         <Provider store={store}>
             <PetList />
         </Provider>
     );
 
    const currentList = screen.getByRole('heading').nextSibling.children

    //last element will be the add button
    const numberOfPets = currentList.length - 1
     
    //open add modal
    fireEvent.click(screen.getByTestId('modal-add'))

    //name your pet
    fireEvent.change(screen.getByTestId("name-input"), {
        target: {value: 'Merlin'},
      })

    //press add
    fireEvent.click(screen.getByTestId('add'))
 
    const newList = screen.getByRole('heading').nextSibling.children
    const newNumberOfPets = newList.length - 1

    expect(newNumberOfPets).toEqual(numberOfPets + 1)
     
 })

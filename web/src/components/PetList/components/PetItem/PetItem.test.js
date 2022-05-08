import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../../app/store'
import { generatePets } from '../../../../helpers/generatePets';
import PetItem from './PetItem';


const pets = generatePets();

test('renders pet image', () => {
    const { getByRole } = render(
        <Router>
            <Provider store={store}>
                <PetItem pet={pets[0]} />
            </Provider>
        </Router>
    );
    expect(getByRole('img', { name: 'pet' })).toBeInTheDocument()
});

test('renders pet name', () => {
    const { getByText } = render(
        <Router>
            <Provider store={store}>
                <PetItem pet={pets[0]} />
            </Provider>
        </Router>
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
        <Router>    
            <Provider store={store}>
                <PetItem pet={pets[0]} />
            </Provider>
        </Router>
    );
    expect(getByText(/Number of feeds/)).toBeInTheDocument();
    expect(getByText(`${pets[0].feeds}`)).toBeInTheDocument();
});

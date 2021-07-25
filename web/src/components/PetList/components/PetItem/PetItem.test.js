import React from 'react';
import { render, screen } from '@testing-library/react';
// import {  } from '@testing-library/dom';
import { generatePets } from '../../../../helpers/generatePets';
import { Provider } from 'react-redux';
import { store } from '../../../../app/store';
import PetItem from './PetItem';

const pets = generatePets();
const randomImage = '4e520217-bf43-4c28-aad3-7535120d7553.jpg';

beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
        text: jest.fn().mockResolvedValue(randomImage)
    })
});

afterEach(() => {
    jest.restoreAllMocks();
});

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

test('fetches random dog image', () => {
    const { getByText, debug } = render(
        <Provider store={store}>
            <PetItem pet={pets[0]} />
        </Provider>
    );
    expect(fetch).toHaveBeenCalledWith('https://random.dog/woof?include=jpg, jpeg');
});

test('renders random dog image', () => {
    const petsWithRamdomImage = generatePets();
    const pet = petsWithRamdomImage[0];
    pet.imageUrl = `https://random.dog/${randomImage}`;

    const { getByText, debug, container } = render(
        <Provider store={store}>
            <PetItem pet={pet} />
        </Provider>
    );
    const petImage = screen.getByAltText('pet');
    expect(petImage).toHaveAttribute('src', `https://random.dog/${randomImage}`);
});

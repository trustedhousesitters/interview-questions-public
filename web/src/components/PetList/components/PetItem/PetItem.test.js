import React from 'react';
import userEvent from '@testing-library/user-event';
import { generatePets } from '../../../../helpers/generatePets';
import PetItem from './PetItem';
import { renderWithProviders } from '../../../../test-utils';

const pets = generatePets();
const preloadedState = { pets: { pets } };

test('renders pet image', () => {
    const { getByRole } = renderWithProviders(<PetItem pet={pets[0]} />);
    expect(getByRole('img', { name: 'pet' })).toBeInTheDocument();
});

test('renders pet name', () => {
    const { getByText } = renderWithProviders(<PetItem pet={pets[0]} />);
    expect(getByText(/Name/)).toBeInTheDocument();
    expect(getByText(pets[0].name)).toBeInTheDocument();
});

test('renders pet animal type', () => {
    const { getByText } = renderWithProviders(<PetItem pet={pets[0]} />);
    expect(getByText(/Animal Type/)).toBeInTheDocument();
    expect(getByText(pets[0].type)).toBeInTheDocument();
});

test('renders number of feeds', () => {
    const { getByText } = renderWithProviders(<PetItem pet={pets[0]} />);
    expect(getByText(/Number of feeds/)).toBeInTheDocument();
    expect(getByText(`${pets[0].feeds}`)).toBeInTheDocument();
});

test('can delete an item', () => {
    const pet = pets[0];
    const { store, getByRole } = renderWithProviders(<PetItem pet={pet} />, {
        preloadedState,
    });

    expect(store.getState().pets.pets).toEqual(expect.arrayContaining([pet]));
    userEvent.click(getByRole('button', { name: 'Delete pet' }));
    expect(store.getState().pets.pets).toEqual(
        expect.not.arrayContaining([pet])
    );
});

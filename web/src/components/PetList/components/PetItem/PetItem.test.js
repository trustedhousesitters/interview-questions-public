import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import { deletePet } from '../../actions';
import { generatePets } from '../../../../helpers/generatePets';
import PetItem from './PetItem';

jest.mock('react-redux', () => ({
    useDispatch: () => jest.fn(),
}));
jest.mock('../../actions', () => ({
    deletePet: jest.fn(),
}));

const pets = generatePets();

test('renders pet image', () => {
    const { getByRole } = render(
        <PetItem pet={pets[0]} />
    );
    expect(getByRole('img', { name: 'pet' })).toBeInTheDocument()
});

test('renders pet name', () => {
    const { getByText } = render(
        <PetItem pet={pets[0]} />
    );
    expect(getByText(/Name/)).toBeInTheDocument();
    expect(getByText(pets[0].name)).toBeInTheDocument();
});

test('renders pet animal type', () => {
    const { getByText } = render(
        <PetItem pet={pets[0]} />
    );
    expect(getByText(/Animal Type/)).toBeInTheDocument();
    expect(getByText(pets[0].type)).toBeInTheDocument();
});

test('renders number of feeds', () => {
    const { getByText } = render(
        <PetItem pet={pets[0]} />
    );
    expect(getByText(/Number of feeds/)).toBeInTheDocument();
    expect(getByText(`${pets[0].feeds}`)).toBeInTheDocument();
});

test('calls deletePet action with correct params on delete icon click', () => {
    deletePet.mockReset();
    const { getByRole } = render(
      <PetItem pet={pets[0]} />
    );

    expect(deletePet).toHaveBeenCalledTimes(0);
    userEvent.click(getByRole('button'));
    expect(deletePet).toHaveBeenCalledWith(pets[0].id);
});

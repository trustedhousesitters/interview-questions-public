import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import PetItem from './PetItem';
import { store } from '../../../../app/store';
import { generatePets } from '../../../../helpers/generatePets';

const pets = generatePets();
const WrappedPetItem = () => (
  <Provider store={store}>
    <PetItem pet={pets[0]} />
  </Provider>
);

test('renders pet image', () => {
  const { getByRole } = render(<WrappedPetItem />);
  expect(getByRole('img', { name: 'pet' })).toBeInTheDocument();
});

test('renders pet name', () => {
  const { getByText } = render(<WrappedPetItem />);
  expect(getByText(/Name/)).toBeInTheDocument();
  expect(getByText(pets[0].name)).toBeInTheDocument();
});

test('renders pet animal type', () => {
  const { getByText } = render(<WrappedPetItem />);
  expect(getByText(/Animal Type/)).toBeInTheDocument();
  expect(getByText(pets[0].type)).toBeInTheDocument();
});

test('renders number of feeds', () => {
  const { getByText } = render(<WrappedPetItem />);
  expect(getByText(/Number of feeds/)).toBeInTheDocument();
  expect(getByText(`${pets[0].feeds}`)).toBeInTheDocument();
});

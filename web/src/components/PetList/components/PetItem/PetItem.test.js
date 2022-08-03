import React from 'react';

import { renderWithProviders } from '../../../../test-utils';
import { generatePets } from '../../../../helpers/generatePets';
import PetItem from './PetItem';

/** HELPERS */

const renderPetItem = (pet) => renderWithProviders(<PetItem pet={pet} />);
const pets = generatePets();

/** TESTS */

test('should use the fallback dog image when image prop is omitted', () => {
  const { getByRole } = renderPetItem(generatePets(1));

  expect(getByRole('img').src).toEqual(expect.stringContaining('Dog.svg'));
});

test('should use the specified dog image when image prop is present', () => {
  const imageUrl =  'https://random.dog/9834720938472.jpg';
  const { getByRole } = renderPetItem({
    id: 32,
    name: 'Charles The Chimp',
    type: 'Chimp',
    feeds: 5,
    imageUrl
  });

  expect(getByRole('img').src).toEqual(expect.stringContaining(imageUrl));
});

test('renders pet name', () => {
  const { getByText } = renderPetItem(pets[0]);

  expect(getByText(/Name/)).toBeInTheDocument();
  expect(getByText(pets[0].name)).toBeInTheDocument();
});

test('renders pet animal type', () => {
  const { getByText } = renderPetItem(pets[0]);

  expect(getByText(/Animal Type/)).toBeInTheDocument();
  expect(getByText(pets[0].type)).toBeInTheDocument();
});

test('renders number of feeds', () => {
  const { getByText } = renderPetItem(pets[0]);

  expect(getByText(/Number of feeds/)).toBeInTheDocument();
  expect(getByText(`${pets[0].feeds}`)).toBeInTheDocument();
});

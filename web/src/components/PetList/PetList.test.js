import React from 'react';
import { render } from '@testing-library/react';
import { generatePets } from '../../helpers/generatePets';
import PetList from './PetList';

const renderPetList = (pets) => render(<PetList pets={pets} />);

test('renders the correct amount of pets', () => {
  const numberOfPets = 10;
  const { getAllByTestId } = renderPetList(generatePets(numberOfPets));

  expect(getAllByTestId('pet-item')).toHaveLength(numberOfPets);
});

test('renders an empty message when no pets are present', () => {
  const { getByTestId } = renderPetList([]);

  expect(getByTestId('pet-list-empty')).toHaveTextContent('No Pets');
});

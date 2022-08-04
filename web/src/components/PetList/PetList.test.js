import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithProviders } from '../../test-utils';
import { generatePets } from '../../helpers/pets';
import PetList from './PetList';

/** HELPERS */

const selectors = {
  PET_ITEM: 'pet-item',
  EMPTY_LIST: 'pet-list-empty',
};

const renderPetList = (pets) =>
  renderWithProviders(<PetList />, {
    preloadedState: {
      pets: {
        pets: pets,
      },
    },
  });

/** TESTS */

test('renders the correct amount of pets', () => {
  const numberOfPets = 10;
  const { getAllByTestId } = renderPetList(generatePets(numberOfPets));

  expect(getAllByTestId(selectors.PET_ITEM)).toHaveLength(numberOfPets);
});

test('renders an empty message when no pets are present', () => {
  const { getByTestId } = renderPetList([]);

  expect(getByTestId(selectors.EMPTY_LIST)).toHaveTextContent(`You don't currently have any pets.`);
});

test('focus is correctly managed when last pet is removed', async () => {
  const { getByRole, getByTestId } = renderPetList(generatePets(1));

  fireEvent(
    getByRole('button'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  );

  expect(document.activeElement).toEqual(getByTestId(selectors.EMPTY_LIST));
});

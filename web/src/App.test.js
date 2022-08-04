import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from './app/store';
import App from './App';

import { renderWithProviders } from './test-utils';
import { generatePets } from './helpers/pets';

/** HELPERS */

const selectors = {
  PET_ITEM: 'pet-item',
};

const renderApp = (pets) =>
  renderWithProviders(<App />, {
    preloadedState: {
      pets: {
        pets: pets,
      },
    },
  });

test('renders logo', () => {
  const { getByRole } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByRole('img', { name: 'logo trusted housesitters' })).toBeInTheDocument();
});

test('Form can be successfully submitted', () => {
  const numberOfPets = 1;
  const newPetName = 'Chuckles';
  const newPetType = 'Chicken';

  const { getAllByTestId, getByTestId } = renderApp(generatePets(numberOfPets));
  const nameInput = getByTestId('name');
  const typeInput = getByTestId('animaltype');
  const form = getByTestId('petform');

  fireEvent.change(nameInput, { target: { value: newPetName } });
  fireEvent.change(typeInput, { target: { value: newPetType } });
  fireEvent.submit(form);

  const allPets = getAllByTestId(selectors.PET_ITEM);

  expect(allPets).toHaveLength(numberOfPets + 1);
  expect(allPets[0]).toHaveTextContent(newPetName);
  expect(allPets[0]).toHaveTextContent(newPetType);
  expect(nameInput.value).toBe('');
  expect(typeInput.value).toBe('');
});

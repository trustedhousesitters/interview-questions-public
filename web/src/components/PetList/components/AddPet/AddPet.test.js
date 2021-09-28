import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { wait } from '@testing-library/dom';

import { addPet } from '../../actions';
import AddPet from './AddPet';

const mockImageUrl = 'image';
const hideModal = jest.fn();

const { getComputedStyle } = window;
window.getComputedStyle = elt => getComputedStyle(elt);

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}));
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: el => el,
}));
jest.mock('../../actions', () => ({
  addPet: jest.fn(),
}));
jest.mock('../../../../services/images', () => ({
  getRandomDogImage: () => mockImageUrl,
}));

describe('Add Pet', () => {

  let nameInput, typeInput, feedsInput, ageInput, confirmButton;

  beforeEach(() => {
    const { getByRole } = render(
      <AddPet hideModal={hideModal} />
    );
    nameInput = getByRole('textbox', { name: 'Pet Name *' });
    typeInput = getByRole('textbox', { name: 'Animal Type' });
    feedsInput = getByRole('spinbutton', { name: 'Number of Feeds' });
    ageInput = getByRole('spinbutton', { name: 'Pet Age' });
    confirmButton = getByRole('button', { name: 'Confirm' });
  });

  test('renders input for pet name', () => {
    expect(nameInput).toBeInTheDocument()
  });

  test('renders input for pet type', () => {
    expect(typeInput).toBeInTheDocument()
  });

  test('renders input for feeds', () => {
    expect(feedsInput).toBeInTheDocument()
  });

  test('renders input for pet age', () => {
    expect(ageInput).toBeInTheDocument()
  });

  test('calls addPet on form submit with correct params, after calling getRandomDogImage', async () => {
    addPet.mockRestore();

    const name = 'My Name';
    const type = 'new type';
    const feeds = '10';
    const age = '12';

    userEvent.type(nameInput, name);
    userEvent.type(typeInput, type);
    userEvent.type(feedsInput, feeds);
    userEvent.type(ageInput, age);

    userEvent.click(confirmButton);

    await wait(() => expect(addPet).toHaveBeenCalledWith({ name, type, feeds, age, imageUrl: mockImageUrl }), { timeout: 1000 });

  });

});

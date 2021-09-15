import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import PetList from './PetList';

describe('PetList', () => {
  it('renders title', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <PetList />
      </Provider>
    );

    expect(getByRole('heading')).toHaveTextContent('My Pets');
  });

  it('renders modal', async () => {
    const { getByAltText, getByText } = render(
      <Provider store={store}>
        <PetList />
      </Provider>
    );

    fireEvent.click(getByAltText('Add'));

    await waitFor(() => expect(getByText('Add your pet')).toBeInTheDocument());
  });
});

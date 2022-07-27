import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import PetList from './PetList';
import { renderWithProviders } from '../../test-utils';
import userEvent from '@testing-library/user-event';

test('renders title', () => {
    const { getByRole } = render(
        <Provider store={store}>
            <PetList />
        </Provider>
    );

    expect(getByRole('heading')).toHaveTextContent('My Pets');
});

test('can show and hide pet form', async () => {
    const { getByRole, queryByText } = renderWithProviders(<PetList />);
    userEvent.click(getByRole('button', { name: 'Add new pet' }));
    expect(queryByText('Add a new pet')).toBeInTheDocument();
    userEvent.click(getByRole('button', { name: 'Cancel adding pet' }));
    expect(queryByText('Add a new pet')).not.toBeInTheDocument();
});

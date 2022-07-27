import React from 'react';
import userEvent from '@testing-library/user-event';
import PetForm from './PetForm';
import { renderWithProviders } from '../../../../test-utils';
import { waitFor } from '@testing-library/react';

test('can add a pet', async () => {
    const fido = {
        id: 13,
        name: 'Fido',
        type: 'Rock',
        age: 2,
        feeds: 3,
    };

    const { store, getByRole, getByLabelText } = renderWithProviders(
        <PetForm />
    );

    expect(store.getState().pets.pets).toEqual(
        expect.not.arrayContaining([fido])
    );

    userEvent.type(getByLabelText('Name'), fido.name);
    userEvent.type(getByLabelText('Animal Type'), fido.type);
    userEvent.type(getByLabelText('Number of feeds'), fido.feeds.toString());
    userEvent.type(getByLabelText('Age'), fido.age.toString());
    userEvent.click(getByRole('button', { name: 'Save new pet' }));

    await waitFor(() =>
        expect(store.getState().pets.pets).toEqual(
            expect.arrayContaining([fido])
        )
    );
});

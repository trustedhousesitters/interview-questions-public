import React from 'react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../../../../test-utils';
import PetForm from './PetForm';

const server = setupServer(
    rest.get('https://random.dog/woof.json', (_req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                fileSizeBytes: 295067,
                url: 'random-dog-url',
            })
        );
    })
);

beforeAll(() => {
    server.listen();
});

afterEach(() => {
    server.resetHandlers();
});

afterAll(() => {
    server.close();
});

test('can add a pet', async () => {
    const fido = {
        id: 13,
        name: 'Fido',
        type: 'Rock',
        age: 2,
        feeds: 3,
        imageUrl: 'random-dog-url',
    };

    const { store, getByRole, getByLabelText } = renderWithProviders(
        <PetForm onCancel={jest.fn()} />
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

test('can add a pet when image request fails', async () => {
    server.use(
        rest.get('https://random.dog/woof.json', (_req, res, ctx) => {
            return res(ctx.status(500));
        })
    );

    const fido = {
        id: 13,
        name: 'Fido',
        type: 'Rock',
        age: 2,
        feeds: 3,
        imageUrl: undefined,
    };

    const { store, getByRole, getByLabelText } = renderWithProviders(
        <PetForm onCancel={jest.fn()} />
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

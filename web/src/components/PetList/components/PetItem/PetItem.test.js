import React from 'react';
import { useDispatch } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import { generatePets } from '../../../../helpers/generatePets';
import { deletePetById } from '../../redux/actions'
import PetItem from './PetItem';

jest.mock('react-redux', () => ({
    __esModule: true,
    useDispatch: jest.fn().mockImplementation(() => jest.fn()),
}));

const pets = generatePets();

describe('PetItem', () => {
    it('renders pet image', () => {
        const { getByRole } = render(
            <PetItem pet={pets[0]} />
        );
        expect(getByRole('img', { name: 'pet' })).toBeInTheDocument()
    });

    it('renders pet name', () => {
        const { getByText } = render(
            <PetItem pet={pets[0]} />
        );
        expect(getByText(/Name/)).toBeInTheDocument();
        expect(getByText(pets[0].name)).toBeInTheDocument();
    });

    it('deletes ', () => {
        const { getByText } = render(
            <PetItem pet={pets[0]} />
        );
        expect(getByText(/Name/)).toBeInTheDocument();
        expect(getByText(pets[0].name)).toBeInTheDocument();
    });

    it('renders pet animal type', () => {
        const { getByText } = render(
            <PetItem pet={pets[0]} />
        );
        expect(getByText(/Animal Type/)).toBeInTheDocument();
        expect(getByText(pets[0].type)).toBeInTheDocument();
    });

    it('renders number of feeds', () => {
        const { getByText } = render(
            <PetItem pet={pets[0]} />
        );
        expect(getByText(/Number of feeds/)).toBeInTheDocument();
        expect(getByText(`${pets[0].feeds}`)).toBeInTheDocument();
    });

    it('should call dispatch with the delete action', () => {
        const mockDispatch = jest.fn()
        useDispatch.mockImplementation(() => mockDispatch)

        const { getByTestId } = render(
            <PetItem pet={pets[0]} />
        );

        fireEvent.click(getByTestId('deleteButton'))

        expect(mockDispatch).toHaveBeenCalledWith(deletePetById(0))
    });
})
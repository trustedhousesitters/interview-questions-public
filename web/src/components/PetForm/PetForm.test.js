import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render, screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import PetForm, { ADD_PET_TEST_ID } from './PetForm';
import {addPet} from "../PetList/actions";

const mockedUseDispatch = jest.fn();
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockedUseDispatch
}));

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('../../api/fetchDogPicture', () => ({
    fetchDogPicture: () => "id",
}));

describe('Tests for PetForm', ()  => {
    test('renders PetForm title', async() => {
        const { getByRole } = render(
            <Router>
                <Provider store={store}>
                    <PetForm />
                </Provider>
            </Router>
        );

        await wait(()=> expect(getByRole('heading')).toHaveTextContent('New Pet'))

    });


    test('Name Input is in the document and changes', () => {
            render(
            <Router>
                <Provider store={store}>
                    <PetForm/>
                </Provider>
            </Router> )

            const input = screen.getByLabelText("Name")
            userEvent.type(input, 'Ollie')
            expect(screen.getByLabelText('Name')).toHaveValue('Ollie');
        }
    )

    test('Dispatch action', async () => {
        render(<Router>
            <Provider store={store}>
                <PetForm/>
            </Provider>
        </Router> )

        const input = screen.getByLabelText("Name")
        userEvent.type(input, 'Ollie')
        userEvent.click(screen.getByTestId(ADD_PET_TEST_ID))

        const expectedCallArguments = addPet({age: 0, feeds: 0, id: 13, imageUrl: "id", name: "Ollie", type: ""})

        await wait(()=>expect(mockedUseDispatch).toHaveBeenCalledWith(expectedCallArguments))

    })
})
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render, screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import PetList from './PetList';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));


test('renders loading first, My Pets after fetching', async () => {
    const { getByRole } = render(
        <Router>
            <Provider store={store}>
                <PetList />
            </Provider>
        </Router>
    );

    expect(getByRole('heading')).toHaveTextContent('Loading Pets')
    await wait(()=> expect(getByRole('heading')).toHaveTextContent('My Pets'))
});


test('delete button makes disapear the component, so pet is deleted', async () => {
    render(<Router>
        <Provider store={store}>
            <PetList/>
        </Provider>
    </Router> )

    const element = screen.queryByTestId(`delete-pet-0`)
    userEvent.click(element)
    expect(screen.queryByTestId(`delete-pet-0`)).not.toBeInTheDocument();
  })
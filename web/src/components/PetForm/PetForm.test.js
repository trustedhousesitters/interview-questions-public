import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import PetForm from './PetForm';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test('renders title', () => {
    const { getByRole } = render(
        <Provider store={store}>
            <PetForm />
        </Provider>
    );
      
    expect(getByRole('heading')).toHaveTextContent('New Pet')
});

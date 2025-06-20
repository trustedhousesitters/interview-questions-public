import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import PetList from './PetList';

test('renders title', () => {
    const { getByRole } = render(
        <Provider store={store}>
            <PetList />
        </Provider>
    );
      
    expect(getByRole('heading')).toHaveTextContent('My Pets')
});

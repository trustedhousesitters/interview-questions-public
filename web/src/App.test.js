import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from './app/store';
import App from './App';

test('renders logo', () => {
  const { getByRole } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByRole('img', { name: 'logo trusted housesitters' })).toBeInTheDocument();
});

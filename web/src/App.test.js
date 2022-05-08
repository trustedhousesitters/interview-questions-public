import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders logo', () => {
  const { getByRole } = render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  );

  expect(getByRole('img', { name: 'logo' })).toBeInTheDocument();
});


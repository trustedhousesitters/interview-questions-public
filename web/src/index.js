import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { setupStore } from './app/store';
import { Provider } from 'react-redux';
import { generatePets } from './helpers/pets';

const store = setupStore({ pets: { pets: generatePets(13) } });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

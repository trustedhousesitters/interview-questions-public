import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

import petReducer from '../components/petSlice';

export const setupStore = (preloadedState) => {
  return configureStore(
    {
      reducer: {
        pets: petReducer,
      },
      preloadedState,
    },
    applyMiddleware(thunkMiddleware)
  );
};

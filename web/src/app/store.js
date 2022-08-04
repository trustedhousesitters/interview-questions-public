import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

import petReducer from '../features/pets/petSlice';

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

import { configureStore } from '@reduxjs/toolkit';

import petReducer from '../features/pets/petSlice';

export const store = configureStore({
  reducer: {
    pets: petReducer,
  },
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: {
      pets: petReducer,
    },
    preloadedState,
  });
};

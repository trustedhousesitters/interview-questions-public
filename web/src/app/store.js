import { configureStore } from '@reduxjs/toolkit';
import petReducer from '../components/PetList/reducers';

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: {
      pets: petReducer,
    },
    preloadedState,
  });
};

export const store = setupStore();

import { configureStore } from '@reduxjs/toolkit';
import petReducer from '../components/PetList/reducers';

export const store = configureStore({
  reducer: {
    pets: petReducer,
  },
});

// Log the data held in the store
console.log(store.getState());

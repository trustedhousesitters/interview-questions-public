import { configureStore } from '@reduxjs/toolkit';
import petReducer from '../components/PetList/reducers';

export const store = configureStore({
  reducer: {
    pets: petReducer,
  },
});

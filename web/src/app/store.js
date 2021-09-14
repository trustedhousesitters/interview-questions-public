import { configureStore } from '@reduxjs/toolkit';
import petReducer from '../components/PetList/redux/reducers';

export const store = configureStore({
  reducer: {
    pets: petReducer,
  },
});

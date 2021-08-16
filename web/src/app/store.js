import { configureStore } from '@reduxjs/toolkit';
import petReducer from '../reducers';

export const store = configureStore({
  reducer: {
    pets: petReducer,
  },
});

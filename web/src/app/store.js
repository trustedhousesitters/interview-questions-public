import { configureStore } from '@reduxjs/toolkit';

import petReducer from '../features/pets/petSlice';

export const store = configureStore({
  reducer: {
    pets: petReducer,
  },
});

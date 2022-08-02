import { createSlice } from '@reduxjs/toolkit';

import { generatePets } from '../../helpers/generatePets';

const petSlice = createSlice({
  name: 'pet',
  initialState: {
    pets: generatePets(13),
  },
  reducers: {
    removePetById: (state, action) => {
      state.pets = state.pets.filter((pet) => pet.id !== action.payload);
    },
  },
});

const selectPets = (state) => state.pets.pets;

const { removePetById } = petSlice.actions;

export default petSlice.reducer;

export { petSlice, removePetById, selectPets };

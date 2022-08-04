import { createSlice } from '@reduxjs/toolkit';

import { generatePets } from '../../helpers/pets';

const petSlice = createSlice({
  name: 'pet',
  initialState: {
    pets: generatePets(13),
  },
  reducers: {
    addPet: (state, action) => {
      state.pets = [action.payload, ...state.pets];
    },
    removePetById: (state, action) => {
      state.pets = state.pets.filter((pet) => pet.id !== action.payload);
    },
  },
});

const selectPets = (state) => state.pets.pets;

const { addPet, removePetById } = petSlice.actions;

export default petSlice.reducer;

export { addPet, petSlice, removePetById, selectPets };

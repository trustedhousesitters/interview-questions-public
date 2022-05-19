import { createSlice } from '@reduxjs/toolkit';

import { createPet, generatePets } from '../../helpers/generatePets';

const initialState = {
  pets: generatePets(13),
};

const slice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    addPet: (state, { payload }) => {
      const pet = createPet({ name: payload });
      state.pets = [...state.pets, pet];
    },
    deletePetById: (state, { payload }) => {
      if (payload !== undefined) {
        state.pets = state.pets.filter(({ id }) => id !== payload);
      }
    },
  },
});

export const { addPet, deletePetById } = slice.actions;

export default slice.reducer;

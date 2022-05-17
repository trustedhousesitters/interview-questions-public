import { createSlice } from '@reduxjs/toolkit';
import { generatePets } from '../../helpers/generatePets';

const initialState = {
  pets: generatePets(13),
};

const slice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    deletePetById: (state, { payload }) => {
      if (payload !== undefined) {
        state.pets = state.pets.filter(({ id }) => id !== payload);
      }
    },
  },
});

export const { deletePetById } = slice.actions;

export default slice.reducer;

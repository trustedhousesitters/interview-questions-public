import {createSlice} from '@reduxjs/toolkit';
import {GeneratePets} from './petGenerator';

const initialState = {
  pets: GeneratePets(),
};

// export default function appReducer(state = initialState, action) {
//   switch (action.type) {
//     default:
//       return state;
//   }
// }

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    deletePet(state, action) {
      const petId = action.payload;
      state.pets = state.pets.filter(pet => pet.id !== petId);
    },
  },
});

export default appSlice.reducer;
export const {deletePet} = appSlice.actions;

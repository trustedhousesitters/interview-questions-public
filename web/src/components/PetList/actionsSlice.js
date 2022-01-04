// Both reducers and actions can be written under a slice - no switch statements needed
import { createSlice } from '@reduxjs/toolkit';

export const actionSlice = createSlice({
	name: 'actions',
	initialState: [],
	reducers: {
		addPet: (state, action) => {
			
		},
		removePet: (state, action) => {

		},
	},
});

// Each case under reducers becomes an action
export const { addPet, removePet } = actionSlice.actions;

// Set as reducer
export default actionSlice.reducer;
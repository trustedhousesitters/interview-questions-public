import { configureStore } from '@reduxjs/toolkit';
import petReducer from '../components/PetList/reducers';
// Import the reducer from our actionSlice into the store
//import actionReducer from '../components/PetList/actionSlice';

export const store = configureStore({
  reducer: {
    pets: petReducer,
    //actions: actionReducer		// Add our reducer to the store
  },
});

// Log the data held in the store
console.log(store.getState());

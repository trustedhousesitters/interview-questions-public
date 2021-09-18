import {GeneratePets} from './petGenerator';
import {DELETE_PET} from './actions';

const initialState = {
  pets: GeneratePets(),
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_PET:
      const {petId} = action.payload;
      return {
        ...state,
        pets: state.pets.filter(pet => pet.id !== petId),
      };
    default:
      return state;
  }
}

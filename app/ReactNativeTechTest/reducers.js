import {GeneratePets} from './petGenerator';
import {ADD_PET, DELETE_PET} from './actions';

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
    case ADD_PET:
      const {petDetails} = action.payload;
      const id = state.pets.length;
      return {
        ...state,
        pets: [...state.pets, {...petDetails, id}],
      };
    default:
      return state;
  }
}

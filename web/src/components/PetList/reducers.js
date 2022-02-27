import { generatePets } from "../../helpers/generatePets";

const initialState = {
  pets: generatePets(13),
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case "DELETE_PET_ITEM":
      return {
        ...state,
        pets: state.pets.filter((pet) => pet.id !== action.payload),
      };
    case "ADD_PET_ITEM":
      return {
        ...state,
        pets: [...state.pets, action.payload],
      };
    default:
      return state;
  }
}

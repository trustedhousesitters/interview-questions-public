import { generatePets } from '../../helpers/generatePets';

const initialState = {
  pets: generatePets(13),
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case "remove":
      return {
        pets: state.pets.filter(pet => pet.id !== action.petId)
      }
    case "add":
      if(!action.pet.name) {
        return state
      }
      return { pets: [...state.pets, {...action.pet, id: state.pets.length + 1}]}
    default:
      return state
  }
}

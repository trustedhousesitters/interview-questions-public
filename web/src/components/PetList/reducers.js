import { generatePets } from '../../helpers/generatePets';
import {
    ADD_PET, REMOVE_PET
} from "./actions";

const initialState = {
  pets: generatePets(13),
};

export default function appReducer(state = initialState, action) {

	console.log(state);
	console.log(action);

  switch (action.type) {
    case ADD_PET:
        return {
        	pets: [...state.pets, action.pet],
        }
    case REMOVE_PET:
        return {
        	pets: state.pets.filter((item, index) => action.pet !== item.id)
        };
    default:
      return state
  }
}

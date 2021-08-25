import { GeneratePets } from './petGenerator';

export const Actions = {
  DELETE_PET: 'DELETE_PET',
};

const initialState = {
  pets: GeneratePets(),
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.DELETE_PET:
      return {
        ...state,
        pets: state.pets.filter(item => item.id !== action.payload.id),
      }
    default:
      return state
  }
}

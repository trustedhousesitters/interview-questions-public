import { GeneratePets } from './petGenerator';

const initialState = {
  pets: GeneratePets(),
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

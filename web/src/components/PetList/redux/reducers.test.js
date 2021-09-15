import petsReducer from './reducers';
import { CREATE_PET, DELETE_PET } from './types';

describe('pets reducer', () => {
  it('should return items in the initial state', () => {
    const returnedState = petsReducer(undefined, { type: 'not set' });
    expect(returnedState.pets).toBeInstanceOf(Array);
    expect(returnedState.pets.length).toEqual(13);
  });

  it('should delete a pet', () => {
    const initialState = {
      pets: [
        {
          id: 223,
          name: 'flash',
          type: 'dog',
          age: 12,
          feeds: 3,
        },
      ],
    };

    const returnedState = petsReducer(initialState, {
      type: DELETE_PET,
      payload: { id: 223 },
    });
    expect(returnedState.pets).toBeInstanceOf(Array);
    expect(returnedState.pets.length).toEqual(0);
  });

  it('should delete nothing if no id matches', () => {
    const initialState = {
      pets: [
        {
          id: 223,
          name: 'flash',
          type: 'dog',
          age: 12,
          feeds: 3,
        },
      ],
    };

    const returnedState = petsReducer(initialState, {
      type: DELETE_PET,
      payload: { id: 224 },
    });
    expect(returnedState.pets).toBeInstanceOf(Array);
    expect(returnedState.pets.length).toEqual(1);
  });

  it('should create a pet', () => {
    const initialState = {
      pets: [],
    };

    const returnedState = petsReducer(initialState, {
      type: CREATE_PET,
      payload: { name: 'Dolly', type: 'Dog', feeds: 3 },
    });
    expect(returnedState.pets).toBeInstanceOf(Array);
    expect(returnedState.pets.length).toEqual(1);

    expect(returnedState.pets[0].name).toEqual('Dolly');
    expect(returnedState.pets[0].type).toEqual('Dog');
    expect(returnedState.pets[0].feeds).toEqual(3);
  });
});

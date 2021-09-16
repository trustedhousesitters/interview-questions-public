import petsReducer from './reducers';
import { CREATE_PET, DELETE_PET } from './types';
import { addImageToPet, createPet, deletePetById } from './actions';

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

    const returnedState = petsReducer(initialState, deletePetById(223));
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

    const returnedState = petsReducer(initialState, deletePetById(224));
    expect(returnedState.pets).toBeInstanceOf(Array);
    expect(returnedState.pets.length).toEqual(1);
  });

  it('should create a pet', () => {
    const initialState = {
      pets: [],
    };

    const returnedState = petsReducer(
      initialState,
      createPet('Dolly', 'Dog', 3)
    );
    expect(returnedState.pets).toBeInstanceOf(Array);
    expect(returnedState.pets.length).toEqual(1);

    expect(returnedState.pets[0].name).toEqual('Dolly');
    expect(returnedState.pets[0].type).toEqual('Dog');
    expect(returnedState.pets[0].feeds).toEqual(3);
    expect(returnedState.pets[0].imageLoading).toBe(true);
  });

  it('should add an image to a pet', () => {
    const initialState = {
      pets: [
        {
          id: 'e7ac0ddc-1725-452e-ab58-3f6e74c95f05',
          name: 'asdf',
          type: '',
          age: 9,
          feeds: 3,
          imageLoading: true,
        },
      ],
    };

    const returnedState = petsReducer(
      initialState,
      addImageToPet('e7ac0ddc-1725-452e-ab58-3f6e74c95f05', 'https://some.img')
    );

    expect(returnedState).toEqual({
      pets: [
        {
          id: 'e7ac0ddc-1725-452e-ab58-3f6e74c95f05',
          name: 'asdf',
          type: '',
          age: 9,
          feeds: 3,
          imageLoading: false,
          imageUrl: 'https://some.img',
        },
      ],
    });
  });
});

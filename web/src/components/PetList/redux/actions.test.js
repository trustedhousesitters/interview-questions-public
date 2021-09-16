import { addImageToPet, createPet, deletePetById } from './actions';
import { ADD_IMAGE_TO_PET, CREATE_PET, DELETE_PET } from './types';
import { add } from 'react-modal/lib/helpers/classList';

describe('pet actions', () => {
  it('should present a fully formed delete action', () => {
    expect(deletePetById(234)).toStrictEqual({
      type: DELETE_PET,
      payload: {
        id: 234,
      },
    });
  });

  it('should present a fully formed create action', () => {
    const createdPet = createPet('Dolly', 'Dog', 3);

    expect(createdPet.type).toEqual(CREATE_PET);
    expect(typeof createdPet.payload.pet.id).toBe('string');
    expect(createdPet.payload.pet.name).toEqual('Dolly');
    expect(createdPet.payload.pet.type).toEqual('Dog');
    expect(createdPet.payload.pet.feeds).toEqual(3);
  });

  it('should present an action to allow the image to be added to pet', () => {
    expect(addImageToPet('asdf', 'https://some.img')).toStrictEqual({
      type: ADD_IMAGE_TO_PET,
      payload: {
        id: 'asdf',
        url: 'https://some.img',
      },
    });
  });
});

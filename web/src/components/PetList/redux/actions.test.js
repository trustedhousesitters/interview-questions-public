import { createPet, deletePetById } from './actions';
import { CREATE_PET, DELETE_PET } from './types';

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
    expect(createPet('Dolly', 'Dog', 3)).toStrictEqual({
      type: CREATE_PET,
      payload: {
        name: 'Dolly',
        type: 'Dog',
        feeds: 3,
      },
    });
  });
});

import { testSaga } from 'redux-saga-test-plan';
import { fetchDogImage } from './sagas';
import { requestRandomDogImage } from './api';
import { addImageToPet, createPet } from './actions';

it('should create a sequence for the control of adding a pet image', () => {
  const createAction = createPet('Dolly', 'Dog', 3);

  testSaga(fetchDogImage, createAction)
    .next()
    .call(requestRandomDogImage)
    .next('https://some.img')
    .put(addImageToPet(createAction.payload.pet.id, 'https://some.img'))
    .next()
    .isDone();
});

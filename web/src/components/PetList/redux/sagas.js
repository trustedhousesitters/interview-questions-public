import { takeLatest, call, put } from 'redux-saga/effects';
import { CREATE_PET } from './types';
import { requestRandomDogImage } from './api';
import { addImageToPet } from './actions';

export function* fetchDogImage(action) {
  const imageUrl = yield call(requestRandomDogImage);

  yield put(addImageToPet(action.payload.pet.id, imageUrl));
}

export function* pets() {
  yield takeLatest(CREATE_PET, fetchDogImage);
}

import { all } from 'redux-saga/effects';
import { pets } from '../components/PetList/redux/sagas';

export function* rootSagas() {
  yield all([pets()]);
}

import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import petReducer from '../components/PetList/redux/reducers';
import { rootSagas } from './rootSagas';

const sagaMiddleware = createSagaMiddleware();

const createStore = () => {
  const configuredStore = configureStore({
    reducer: {
      pets: petReducer,
    },
    middleware: [sagaMiddleware],
  });

  sagaMiddleware.run(rootSagas);

  return configuredStore;
};

export const store = createStore();

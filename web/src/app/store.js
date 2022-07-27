import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import petReducer from '../components/PetList/reducers';

export const setupStore = (preloadedState) => {
    return configureStore(
        {
            reducer: {
                pets: petReducer,
            },
            preloadedState,
        },
        applyMiddleware(thunkMiddleware)
    );
};

export const store = setupStore();

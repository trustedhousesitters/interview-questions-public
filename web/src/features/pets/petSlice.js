// @ts-check
import { createSlice } from '@reduxjs/toolkit';

import { getDogImage } from '../../api';
import { generatePets } from '../../helpers/pets';

const petSlice = createSlice({
  name: 'pet',
  initialState: {
    pets: generatePets(13),
  },
  reducers: {
    addPet: (state, action) => {
      state.pets = [action.payload, ...state.pets];
    },
    removePetById: (state, action) => {
      state.pets = state.pets.filter((pet) => pet.id !== action.payload);
    },
    updatePetImage: (state, action) => {
      state.pets = state.pets.map((pet) =>
        pet.id === action.payload.petId ? { ...pet, imageUrl: action.payload.imageUrl } : pet
      );
    },
  },
});

const { addPet, removePetById, updatePetImage } = petSlice.actions;

/**
 *
 * @param {string} imageUrl
 * @returns {Promise<void>}
 */
const loadImage = (imageUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = function onImageLoaded() {
      resolve();
    };

    img.onerror = function onImageErrored() {
      reject();
    };
  });
};

/**
 * @param {string} petId
 * @returns {(dispatch: any, _getState: any) => void}
 */
function updatePetImageThunk(petId) {
  return function (dispatch, _getState) {
    getDogImage()
      .then((imageUrl) => {
        loadImage(imageUrl).then(() => {
          dispatch(updatePetImage({ petId, imageUrl }));
        });
      })
      .catch(() => {
        /** TODO:
         * Dispatch an action that could notifify the user the image failed
         * Log potential issue to Sentry */
      });
  };
}

const selectPets = (state) => state.pets.pets;

export default petSlice.reducer;

export { petSlice, addPet, removePetById, updatePetImageThunk, selectPets };

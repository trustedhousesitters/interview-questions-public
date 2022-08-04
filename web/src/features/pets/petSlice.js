// @ts-check
import { createSlice } from '@reduxjs/toolkit';

import { getDogImage } from '../../api';
import { generatePets } from '../../helpers/pets';
import { loadImage } from '../../helpers/image';
import { pluralise } from '../../helpers/pluralise';

/** @typedef { import(".././../features/pets/pet").Pet } Pet */

/**
 * Remove the pet with the matching id from the list of pets
 * @param {Pet[]} pets
 * @param {Pet["id"]} petToRemoveId
 * @returns {{ pets: Pet[], removedPetName: string }}
 */
const removePetAndRetainName = (pets, petToRemoveId) => {
  /** @type {{ pets: Pet[], removedPetName: string }} */
  const initialState = { pets: [], removedPetName: '' };

  return pets.reduce((acc, pet) => {
    if (pet.id === petToRemoveId) {
      return { ...acc, removedPetName: pet.name };
    }

    return { ...acc, pets: [...acc.pets, pet] };
  }, initialState);
};

const petSlice = createSlice({
  name: 'pet',
  initialState: {
    pets: generatePets(13),
    a11yInfo: 'You have 13 pets',
  },
  reducers: {
    addPet: (state, action) => {
      const newPets = [action.payload, ...state.pets];

      state.pets = newPets;
      state.a11yInfo = `
        ${action.payload.name} has been added.
        You now have ${newPets.length} ${pluralise('pet', 'pets', newPets.length)}.`;
    },
    removePetById: (state, action) => {
      const { pets, removedPetName } = removePetAndRetainName(state.pets, action.payload);

      state.pets = pets;
      state.a11yInfo = `
        ${removedPetName} has been removed.
        You now have ${pets.length} ${pluralise('pet', 'pets', pets.length)}.`;
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
 * Fetches the dog image, ensures the image has loaded before
 * dispatching updatePetImage
 * @param {string} petId
 * @returns {(dispatch: any, _getState: any) => void}
 */
function updatePetImageThunk(petId) {
  return function (dispatch, _getState) {
    /** TODO: Given more time, I'd refactor this to get rid of the nested Promises */
    getDogImage()
      .then((imageUrl) => {
        loadImage(imageUrl).then(() => {
          dispatch(updatePetImage({ petId, imageUrl }));
        });
      })
      .catch(() => {
        /** TODO:
         * Dispatch an action that could notifify the user the image failed to load
         * Log potential issue to Sentry */
      });
  };
}

const selectPets = (state) => state.pets;

export default petSlice.reducer;

export { petSlice, addPet, removePetById, updatePetImageThunk, selectPets };

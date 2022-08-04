// @ts-check
import { nanoid } from '@reduxjs/toolkit';

/**
 * Our main pet object
 * @typedef {Object} Pet
 * @property {string} id - The unique ID for the Pet
 * @property {string} name - The name of the Pet
 * @property {string} type - Animal classification. eg Dog, Cat, etc.
 * @property {number} age - How old (in human years) is the pet
 * @property {number} feeds - How many times the pet has been fed
 * @property {string} [imageUrl] - A url to the image of the Pet
 */

const PET_NAMES = ['Mr. Fluffings', 'The Whiskertron', 'Dogbert', 'Keith', 'Woofo'];

const PET_TYPES = ['Dog', 'Cat', 'Antelope', 'Wild Boar', 'Rock'];

/**
 * Generates a random number between zero and the supplied number
 * @param {number} max 
 * @returns {number}
 */
const getRandomInt = (max) => Math.floor(Math.random() * max)

/**
 * Returns the specified number of randomly generated pets
 * @param {number} [numberOfPets=3]
 * @returns {Pet[]}
 */
const generatePets = (numberOfPets = 3) => {
  return Array.from({ length: numberOfPets }).map((_, i) => ({
    id: nanoid(),
    name: PET_NAMES[getRandomInt(PET_NAMES.length)],
    type: PET_TYPES[getRandomInt(PET_TYPES.length)],
    age: getRandomInt(15),
    feeds: getRandomInt(6) + 1,
  }));
};

/**
 * Returns the specified number of randomly generated pets
 * @param {Partial<Pet>} partialPet
 * @returns {Pet}
 */
 const buildPet = (partialPet) => 
  ({
    id: nanoid(),
    feeds: 0,
    age: 0,
    type: 'Unknown',
    name: 'Unknown',
    ...partialPet
  });


export { buildPet, generatePets };

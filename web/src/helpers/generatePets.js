// @ts-check

/**
 * Our main pet object
 * @typedef {Object} Pet
 * @property {number} id - The unique ID for the Pet
 * @property {string} name - The name of the Pet
 * @property {string} type - Animal classification. eg Dog, Cat, etc.
 * @property {number} feeds - How many times the pet has been fed
 * @property {string} [imageUrl] - A url to the image of the Pet
 */


const PET_NAMES = [
    'Mr. Fluffings',
    'The Whiskertron',
    'Dogbert',
    'Keith',
    'Woofo',
];
  
const PET_TYPES = [
    'Dog',
    'Cat',
    'Antelope',
    'Wild Boar',
    'Rock',
];


/**
 * Returns the specified number of randomly generated pets 
 * @param {number} [numberOfPets=3]
 * @returns {Pet[]}
 */
const generatePets = (numberOfPets = 3) => {
  return Array.from({ length: numberOfPets }).map((_, i) => (
    {
      id: i + 1,
      name: PET_NAMES[Math.floor(Math.random() * PET_NAMES.length)],
      type: PET_TYPES[Math.floor(Math.random() * PET_TYPES.length)],
      age: Math.floor(Math.random() * 15),
      feeds: Math.floor(Math.random() * 6) + 1,
    })
  )
};

export { generatePets };

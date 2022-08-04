/**
 * Creates a full URI for the specifc dog image
 * @param {string} path
 * @returns {string}
 */
const makeDogImageUrl = (path) => {
  return `https://random.dog/${path}`;
};

const getDogImage = () =>
  fetch('https://random.dog/woof?include=jpg')
    .then((res) => res.text())
    .then(makeDogImageUrl);

export { getDogImage };

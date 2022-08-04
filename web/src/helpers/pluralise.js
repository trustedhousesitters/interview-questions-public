/**
 * @param {string} singular
 * @param {string} plural
 * @param {number} amount
 * @returns {string}
 */
const pluralise = (singular, plural, amount) => {
  return amount === 1 ? singular : plural;
};

export { pluralise };

/**
 * Generate a shuffeled array of numbers from 0 to length.
 *
 * @param {number} length of the array to be generated.
 */

const getShuffeledList = (length) => {
  const array = Array.from(Array(length), (_x, index) => index);
  return shuffleArray(array);
};

export default getShuffeledList;

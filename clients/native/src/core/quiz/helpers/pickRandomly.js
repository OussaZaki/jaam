import { shuffleArray } from "./shuffleArray";

/**
 * Takes an array of elements, and picks randomly n elements, if include is passed
 * then it will be added to the random list, and the
 *
 *
 * @param array the array of elements.
 * @param n the number of elements to pick.
 * @param include the element to include in the random list.
 */
export const pickRandomly = (array, n, include) => {
  let result = new Array(n + 1),
    len = array.length,
    taken = new Array(len);

  if (n > len)
    throw new RangeError("pickRandomly: more elements to be taken than available");

  if (include)
    result[n] = include;

  while (n) {
    const x = Math.floor(Math.random() * len);
    if (include && array[x] === include) {
      continue;
    }
    n--;
    result[n] = array[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }

  if (result.length === 2)
    return result[0];

  return shuffleArray(result);
};

export default pickRandomly;

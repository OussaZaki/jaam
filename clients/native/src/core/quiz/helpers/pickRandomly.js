import { shuffleArray } from "./shuffleArray";

const pickRandomly = (array, n, include) => {
  let result = new Array(n + 1),
    len = array.length,
    taken = new Array(len);

  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");

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

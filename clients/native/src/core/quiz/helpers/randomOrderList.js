const randomOrderList = (length) => {
  const array = Array.from(Array(length), (_x, index) => index);
  let tmp, current, top = array.length;
  while (--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }

  return array;
};

export default randomOrderList;

export const uuid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

export const objectPropInArray = (arr, prop, val) => {
  if (arr.length > 0) {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i][prop] === val) {
        return i;
      }
    }
  }
  return false;
};

export const sortArray = (arr, key) => {
  const buffer = arr;

  buffer.sort((a, b) => {
    return a[key] - b[key];
  });

  return buffer;
};

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

export const objectsEqual = (objA: mixed, objB: mixed): boolean => {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null ||
    typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  const bHasOwnProperty = hasOwnProperty.bind(objB);

  for (let i = 0; i < keysA.length; i += 1) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
};

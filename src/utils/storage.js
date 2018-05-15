export const getData = (item) => {
  try {
    return localStorage.getItem(item);
  } catch (error) {
    return false;
  }
};

export const saveData = (item, data) => {
  try {
    localStorage.setItem(item, data);
    return data;
  } catch (error) {
    return false;
  }
};

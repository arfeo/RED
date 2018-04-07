export const getData = (item) => {
  try {
    const data = localStorage.getItem(item);
    return data;
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

export const getData = (item) => {
  try {
    return localStorage.getItem(`RED_${item}`);
  } catch (error) {
    return false;
  }
};

export const saveData = (item, data) => {
  try {
    localStorage.setItem(`RED_${item}`, data);
    return data;
  } catch (error) {
    return false;
  }
};

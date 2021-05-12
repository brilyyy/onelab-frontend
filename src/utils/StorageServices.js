const storeData = (key, value) => {
  window.sessionStorage.setItem(key, value);
};

const clearData = () => {
  window.sessionStorage.clear();
};

const getData = (key) => {
  return window.sessionStorage.getItem(key);
};

export { storeData, clearData, getData };

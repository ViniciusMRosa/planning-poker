import { v4 as uuid } from "uuid";

export const Common = {
  generateRandomUUID: function() {
    return uuid();
  },
  getFromLocalStorageAsObject: function(key) {
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : {};
  },
  setInLocalStorage: function(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
  }
};

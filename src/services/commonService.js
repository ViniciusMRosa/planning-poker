import { v4 as uuid } from "uuid";
import moment from "moment";

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
  },
  generateDefaultSessionName() {
    return "Detalhamento de Tarefas " + moment(new Date()).format("DD/MM/YY");
  }
};

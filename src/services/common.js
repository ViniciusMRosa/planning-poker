import { v4 as uuid } from "uuid";

export const Common = {
  generateRandomUUID: function() {
    return uuid();
  }
};

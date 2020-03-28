import { sessionsCollection } from "../main";

export const SessionService = {
  save: function(session) {
    return sessionsCollection.doc(session.id).set(session);
  },
  getById: function(id) {
    return new Promise((resolve, reject) => {
      sessionsCollection
        .doc(id)
        .get()
        .then(session => {
          if (session.exists) {
            resolve(session.data());
          } else {
            reject("A sessão informada não existe.");
          }
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }
};

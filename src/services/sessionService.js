import { sessionsCollection } from "../main";

export const SessionService = {
  save: function(session) {
    return sessionsCollection.doc(session.id).set(session);
  },
  getById: function(id) {
    return sessionsCollection.doc(id).get();
  }
};

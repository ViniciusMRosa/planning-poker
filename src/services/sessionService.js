import { sessionsCollection } from "../main";
import { Common } from "../services/commonService.js";

export const SessionService = {
  save: function(session) {
    return sessionsCollection.doc(session.id).set(session);
  },
  getById: function(id) {
    return sessionsCollection.doc(id).get();
  },
  addUserToSession: function(sessionData, userName) {
    var user = {
      id: Common.generateRandomUUID(),
      name: userName
    };
    sessionData.users = sessionData.users || [];
    sessionData.users.push(user);
    const promise = new Promise((resolve, reject) => {
      this.save(sessionData)
        .then(() => resolve(user))
        .catch(error => reject(error));
    });
    return promise;
  },
  addGame: function(sessionId, game) {
    const promise = new Promise((resolve, reject) => {
      this.getById(sessionId).then(session => {
        var sessionData = session.data();
        var games = sessionData.games || [];
        games.push(game);
        sessionData.games = games;
        this.save(sessionData)
          .then(() => resolve(game))
          .catch(error => reject(error));
      });
    });
    return promise;
  },
  takeSnapshot: function(id, success, error) {
    sessionsCollection.doc(id).onSnapshot(session => {
      if (session.exists) {
        success(session);
      } else {
        error("Não foi possível obter snapshot da sessão " + id);
      }
    });
  }
};

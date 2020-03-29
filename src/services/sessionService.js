import { sessionsCollection } from "../main";
import { Common } from "../services/commonService.js";

export const SessionService = {
  save: function(session) {
    return new Promise((resolve, reject) => {
      sessionsCollection
        .doc(session.id)
        .set(session)
        .then(() => resolve())
        .catch(function() {
          reject("Ocorreu um erro ao salvar a sessão.");
        });
    });
  },
  delete: function(session) {
    return new Promise((resolve, reject) => {
      sessionsCollection
        .doc(session.id)
        .delete()
        .then(() => resolve())
        .catch(function() {
          reject("Ocorreu um erro ao excluir a sessão.");
        });
    });
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
  addGame: function(session, game) {
    const promise = new Promise((resolve, reject) => {
      game.id = Common.generateRandomUUID();
      session.games = session.games || [];
      session.games.push(game);
      this.save(session)
        .then(() => resolve(game))
        .catch(error => reject(error));
    });
    return promise;
  },
  takeSnapshot: function(id, success, error) {
    sessionsCollection.doc(id).onSnapshot(session => {
      if (session.exists) {
        success(session.data());
      } else {
        error("Não foi possível obter snapshot da sessão " + id);
      }
    });
  }
};

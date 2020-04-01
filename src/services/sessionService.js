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
      game.votes = createVotes(session.users);
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
  },
  vote: function(sessionId, game, vote) {
    return new Promise((resolve, reject) => {
      this.getById(sessionId).then(session => {
        var foundGame = session.games.findIndex(g => g.id == game.id);
        var foundVote = session.games[foundGame].votes.findIndex(
          v => v.user.id === vote.user.id
        );
        session.games[foundGame].votes[foundVote] = vote;
        this.save(session)
          .then(() => resolve(vote))
          .catch(error => reject(error));
      });
    });
  },
  shouldShowCards: function(session, currentGame) {
    if (currentGame && currentGame.id) {
      if (currentGame && currentGame.votes) {
        return currentGame.votes.every(vote => vote.number != 0);
      }
    }
    return false;
  }
};

function createVotes(users) {
  let votes = [];

  if (users) {
    users.forEach(function(user) {
      var vote = {
        user: user,
        number: 0
      };
      votes.push(vote);
    });
  }

  return votes;
}

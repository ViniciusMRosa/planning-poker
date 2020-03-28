import { sessionsCollection } from "../main";
import { Common } from "../services/commonService.js";

export const SessionService = {
  save: function(session) {
    return sessionsCollection.doc(session.id).set(session);
  },
  getById: function(id) {
    return sessionsCollection.doc(id).get();
  },
  addUserToSession: function(sessionData,userName){
    var user = {
      id: Common.generateRandomUUID(),
      name: userName
    };
    sessionData.users = sessionData.users || [];
    sessionData.users.push(user);
    console.log(sessionData);
    const promise = new Promise( ( resolve,reject) => {
      this.save(sessionData)
      .then(() => resolve(user))
      .catch((error) => reject(error));
    });
    
   return promise;
  }
};

<template>
  <div class="container-fluid home">
    <div class="row justify-content-md-center">
      <div class="col-lg-5 col-md-8">
        <h3>Novo Jogo!</h3>
        <div class="form-group">
          <input
            type="text"
            class="form-control text-center"
            id="description"
            v-model="description"
            aria-describedby="descriptionHelp"
          />
          <small
            v-if="!description"
            id="descriptionHelp"
            class="form-text text-muted text-danger"
            >Campo obrigatório.</small
          >
        </div>
        <button
          type="button"
          class="btn btn-app btn-ruffle"
          v-on:click="begin"
          :disabled="!description"
        >
          Jogar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Home",
  data() {
    return {
      description: "Planejamento de Tarefas"
    };
  },
  methods: {
    begin() {
      var game = {
        id: "1fe35579-5ce7-46ec-89e0-7e7236700297",
        description: this.description
      };

      var db = firebase.firestore();

      db.collection("games")
        .add(game)
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    }
  }
};
</script>

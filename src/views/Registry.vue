<template>
  <div class="container-fluid home">
    <div class="row justify-content-md-center">
      <div class="col-lg-4 col-md-4 col-sm-8 col-12">
        <h3>Entrar em uma sessão existente</h3>
        <div class="form-group">
          <label>Id da sessão:</label>
          <input
            type="text"
            class="form-control text-center"
            id="existentSession.id"
            v-model="existentSession.id"
          />
          <small
            v-if="!existentSession.id"
            id="existentSession.idHelp"
            class="form-text text-muted text-danger"
            >Campo obrigatório.</small
          >
        </div>
        <div class="form-group">
          <label>Seu nome:</label>
          <input
            type="text"
            class="form-control text-center"
            id="existentSession.nickname"
            v-model="existentSession.nickname"
          />
          <small
            v-if="!existentSession.nickname"
            id="existentSession.nicknameHelp"
            class="form-text text-muted text-danger"
            >Campo obrigatório.</small
          >
        </div>
        <button
          id="loginButton"
          type="button"
          class="btn btn-app btn-lg"
          v-on:click="login"
          :disabled="!existentSession.id || !existentSession.nickname"
        >
          Entrar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      existentSession: {
        id: "",
        nickname: ""
      }
    };
  },
  methods: {
    login() {
      this.$router.push({
        name: "Game",
        params: {
          existentSession: this.existentSession
        }
      });
    }
  },
  mounted() {
    this.existentSession.id = this.$route.params.sessionId;
  }
};
</script>

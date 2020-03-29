<template>
  <div class="container-fluid home">
    <div class="row justify-content-md-center">
      <div class="col-lg-5 col-md-5 col-sm-8 col-12">
        <h3>Nova Sessão</h3>
        <div class="alert alert-danger" role="alert" v-if="createError">
          <strong>Ocorreu um erro</strong>
          <br />
          {{ createError }}
        </div>
        <div class="form-group">
          <label>Nome da sessão:</label>
          <input
            type="text"
            class="form-control text-center"
            id="newSession.name"
            v-model="newSession.name"
          />
          <small
            v-if="!newSession.name"
            id="newSession.nameHelp"
            class="form-text text-muted text-danger"
            >Campo obrigatório.</small
          >
        </div>
        <button
          id="newSessionButton"
          type="button"
          class="btn btn-app btn-lg"
          v-on:click="create"
          :disabled="!newSession.name"
          v-if="!createLoading"
        >
          Criar
        </button>
        <div v-if="createLoading">
          <font-awesome-icon class="spin" icon="spinner" />
        </div>
        <hr />
      </div>
    </div>
    <div class="row justify-content-md-center">
      <div class="col-lg-5 col-md-5 col-sm-8 col-12">
        <h3>Entrar em uma sessão existente</h3>
        <div
          class="alert alert-danger text-left"
          role="alert"
          v-if="loginError"
        >
          <strong>Ocorreu um erro</strong>
          <br />
          {{ loginError }}
        </div>
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
          v-if="!loginLoading"
        >
          Entrar
        </button>
        <div v-if="loginLoading">
          <font-awesome-icon class="spin" icon="spinner" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Common } from "../services/commonService.js";
import { SessionService } from "../services/sessionService.js";
export default {
  name: "Home",
  data() {
    return {
      newSession: {
        id: Common.generateRandomUUID(),
        name: "Planejamento de Tarefas",
        users: [],
        games: [],
      },
      existentSession: {
        id: "",
        nickname: ""
      },
      createError: "",
      loginError: "",
      createLoading: false,
      loginLoading: false
    };
  },
  methods: {
    create() {
      this.createError = "";
      this.loginError = "";
      this.createLoading = true;

      setTimeout(2000);

      SessionService.save(this.newSession)
        .then(() => {
          this.$router.push({
            path: this.newSession.id + "/admin",
            params: {
              newSession: true,
              sessionId: this.newSession.id
            }
          });
        })
        .catch(function(error) {
          this.createError = error;
        });
    },
    login() {
      this.createError = "";
      this.loginError = "";
      this.loginLoading = true;

      setTimeout(2000);

      SessionService.getById(this.existentSession.id)
        .then(session => {
          this.loginLoading = false;
          if (session.exists) {
            SessionService.addUserToSession(session.data(),this.existentSession.nickname)
              .then((user) => {
              this.$router.push({
                name: "Game",
                params: {
                  sessionId: this.existentSession.id,
                  user: user,
                }
              });
            })
            .catch(function(error) {
              this.loginError = error;
            });
          } else {
            this.loginError = "A sessão informada não existe.";
          }
        })
        .catch(function(error) {
          this.loginError = error;
        });
    }
  }
};
</script>

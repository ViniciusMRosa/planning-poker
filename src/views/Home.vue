<template>
  <div class="container-fluid home">
    <div class="row justify-content-md-center" v-if="!showAdminForm">
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
            class="form-text text-muted text-gray"
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
          Criar <font-awesome-icon icon="hand-sparkles" />
        </button>
        <div v-if="createLoading">
          <font-awesome-icon class="spin" icon="spinner" />
        </div>
        <hr />
      </div>
    </div>
    <div class="row justify-content-md-center" v-if="!showAdminForm">
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
            class="form-text text-muted text-gray"
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
            class="form-text text-muted text-gray"
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
          Entrar <font-awesome-icon icon="play-circle" />
        </button>
        <div v-if="loginLoading">
          <font-awesome-icon class="spin" icon="spinner" />
        </div>
        <hr />
      </div>
    </div>
    <div class="row justify-content-md-center">
      <div class="col-lg-5 col-md-5 col-sm-8 col-12">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="defaultCheck1"
            v-model="showAdminForm"
          />
          <label class="form-check-label" for="defaultCheck1">
            Sou Administrador
          </label>
        </div>
        <div
          class="alert alert-danger text-left margin-top"
          role="alert"
          v-if="loginAdminError"
        >
          <strong>Ocorreu um erro</strong>
          <br />
          {{ loginAdminError }}
        </div>
      </div>
    </div>
    <div class="row justify-content-md-center" v-if="showAdminForm">
      <div class="col-lg-5 col-md-5 col-sm-8 col-12">
        <div class="form-group">
          <label>Id da Sessão:</label>
          <input
            type="text"
            class="form-control text-center"
            id="existentSession.id"
            v-model="existentSession.id"
          />
          <small
            v-if="!existentSession.id"
            id="existentSession.nicknameHelp"
            class="form-text text-muted text-gray"
            >Campo obrigatório.</small
          >
        </div>
        <button
          id="loginButton"
          type="button"
          class="btn btn-app btn-lg"
          v-on:click="loginAdmin"
          :disabled="!existentSession.id"
          v-if="!loginAdminLoading"
        >
          Entrar <font-awesome-icon icon="cogs" />
        </button>
        <div v-if="loginAdminLoading">
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
        games: []
      },
      existentSession: {
        id: "",
        nickname: ""
      },
      showAdminForm: false,
      createError: "",
      loginError: "",
      loginAdminError: "",
      createLoading: false,
      loginLoading: false,
      loginAdminLoading: false
    };
  },
  methods: {
    create() {
      this.clearErrors();
      this.createLoading = true;

      setTimeout(2000);

      SessionService.save(this.newSession).then(
        () => {
          this.$router.push({
            path: this.newSession.id + "/admin",
            params: {
              newSession: true,
              sessionId: this.newSession.id
            }
          });
        },
        error => {
          this.createLoading = false;
          this.createError = error;
        }
      );
    },
    async addUserToSession(updatedSession) {
      var user = {
        id: Common.generateRandomUUID(),
        name: this.existentSession.nickname
      };

      if (!updatedSession.users) updatedSession.users = [];

      updatedSession.users.push(user);
      SessionService.save(updatedSession).then(
        () => {
          this.$router.push(this.existentSession.id + "/game");
        },
        error => {
          this.loginError = error;
        }
      );
    },
    login() {
      this.clearErrors();
      this.loginLoading = true;

      setTimeout(2000);

      SessionService.getById(this.existentSession.id).then(
        session => {
          this.loginLoading = false;
          SessionService.addUserToSession(
            session,
            this.existentSession.nickname
          ).then(
            user => {
              this.$router.push({
                name: "Game",
                params: {
                  sessionId: this.existentSession.id,
                  user: user
                }
              });
            },
            error => {
              this.loginLoading = false;
              this.loginError = error;
            }
          );
        },
        error => {
          this.loginLoading = false;
          this.loginError = error;
        }
      );
    },
    loginAdmin() {
      this.clearErrors();
      this.loginAdminLoading = true;

      setTimeout(2000);

      SessionService.getById(this.existentSession.id).then(
        session => {
          this.loginAdminLoading = false;
          this.$router.push(session.id + "/admin");
        },
        error => {
          this.loginAdminError = error;
          this.loginAdminLoading = false;
        }
      );
    },
    clearErrors() {
      this.createError = "";
      this.loginError = "";
      this.loginAdminError = "";
    }
  },
  watch:{ 
    "showAdminForm"(newValue){
      if (newValue === false) {
        this.loginAdminError = "";
      }
    }
  }
};
</script>

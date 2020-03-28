<template>
  <div class="container-fluid admin">
    <div class="row justify-content-md-center" v-if="loading">
      <div class="col-lg-8 col-md-10 col-sm-12 col-12">
        <div>
          <font-awesome-icon class="spin" icon="spinner" />
        </div>
      </div>
    </div>
    <div class="row justify-content-md-center" v-if="!loading">
      <div class="col-lg-8 col-md-10 col-sm-12 col-12">
        <div class="layout-gray">
          <strong>http://localhost:8080/{{ sessionId }}/registry</strong>
        </div>
      </div>
    </div>
    <div class="row justify-content-md-center" v-if="!loading">
      <div class="col-lg-8 col-md-10 col-sm-12 col-12">
        <div class="alert alert-danger" role="alert" v-if="sessionError">
          <strong>Ocorreu um erro</strong>
          <br />
          {{ sessionError }}
        </div>
        <h3><font-awesome-icon icon="code-branch" /> {{ sessionName }}</h3>
      </div>
    </div>
    <div class="row justify-content-md-center" v-if="!gameStarted">
      <div class="col-lg-2 col-md-3 col-sm-12 col-12 margin-bottom">
        <div class="layout">
          <h4>Usuários</h4>
          <div class="alert alert-info" role="alert" v-if="!users.length">
            Nenhum usuário conectado
          </div>
          <div class="users" v-if="users.length">
            <p v-for="(user, index) in users" v-bind:key="index">
              <font-awesome-icon icon="circle" class="online" /> {{ user }}
            </p>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-5 col-sm-12 col-12">
        <div class="layout">
          <h4>Novo Jogo</h4>
          <div class="form-group">
            <label for="gameTitle">Descrição da Tarefa:</label>
            <input
              type="text"
              class="form-control text-center"
              id="gameTitle"
              v-model="game.title"
              aria-describedby="gameTitleHelp"
            />
            <button
              type="button"
              class="btn btn-app margin-top"
              v-on:click="startGame"
              :disabled="!game.title"
            >
              Começar
            </button>
          </div>
        </div>
      </div>
      <div class="col-lg-8 col-md-10 col-sm-12 col-12" v-if="games.length">
        <br />
        <hr />
        <h4>Tarefas Estimadas:</h4>
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Tarefas</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(game, index) in games" v-bind:key="index">
              <td>
                {{ game.title }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-lg-8 col-md-10 col-sm-12 col-12">
        <br />
        <hr />
        <button type="button" class="btn btn-danger" v-on:click="deleteGame">
          Excluir Sessão <font-awesome-icon icon="trash-alt" />
        </button>
      </div>
    </div>
    <div class="row justify-content-md-center" v-if="gameStarted">
      <div class="col-lg-8 col-md-8 col-sm-12 col-12">
        <div class="layout">
          <small>Descrição da Tarefa:</small>
          <h4>{{ issue }}</h4>
          <div class="alert alert-info" role="alert" v-if="!users.length">
            Nenhum usuário conectado
          </div>
          <div class="row justify-content-md-center users" v-if="users.length">
            <div
              class="col-lg-2 col-md-2 col-sm-4 col-6"
              v-for="(user, index) in users"
              v-bind:key="index"
            >
              <font-awesome-icon icon="circle" class="online" /> {{ user }}
              <div class="playing-card">
                <span class="value">?</span>
              </div>
            </div>
          </div>
          <div class="row justify-content-md-center">
            <div class="col-lg-8 col-md-10 col-sm-12 col-12">
              <button
                type="button"
                class="btn btn-app margin-top"
                v-on:click="finishGame"
              >
                Encerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import { SessionService } from "../services/sessionService.js";
export default {
  name: "Admin",
  data() {
    return {
      sessionId: "",
      sessionName: "",
      users: [],
      games: [],
      game: {
        title: "",
        votes: []
      },
      gameStarted: false,
      loading: true,
      sessionError: "",
      issue: ""
    };
  },
  methods: {
    startGame() {
      this.gameStarted = true;
    },
    finishGame() {
      this.gameStarted = false;
    },
    deleteGame() {
      this.gameStarted = false;
    }
  },
  mounted() {
    if (this.$route.params.sessionId) {
      SessionService.getById(this.$route.params.sessionId)
        .then(session => {
          if (session.exists) {
            this.sessionId = session.data().id;
            this.sessionName = session.data().name;
            this.users = session.data().users.map(u => u.name);
          } else {
            this.sessionError = "A sessão informada não existe.";
          }
          this.loading = false;
        })
        .catch(function(error) {
          this.sessionError = error;
          this.loading = false;
        });
    }
  }
};
</script>

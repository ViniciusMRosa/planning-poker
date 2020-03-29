<template>
  <div class="container-fluid admin">
    <div class="row justify-content-md-center" v-if="loading">
      <div class="col-lg-8 col-md-10 col-sm-12 col-12">
        <div>
          <font-awesome-icon class="spin" icon="spinner" />
        </div>
      </div>
    </div>
    <div class="row justify-content-md-center" v-if="!loading && sessionError">
      <div class="col-lg-8 col-md-10 col-sm-12 col-12">
        <div class="alert alert-danger" role="alert" v-if="sessionError">
          <strong>Ocorreu um erro</strong>
          <br />
          {{ sessionError }}
        </div>
      </div>
    </div>
    <div
      class="row justify-content-md-center"
      v-if="!loading && !gameStarted && !sessionError"
    >
      <div class="col-lg-8 col-md-10 col-sm-12 col-12">
        <div class="layout-gray">
          <strong>http://localhost:8080/{{ sessionId }}/registry</strong>
        </div>
      </div>
    </div>
    <div class="row justify-content-md-center" v-if="!loading && !sessionError">
      <div class="col-lg-8 col-md-10 col-sm-12 col-12">
        <h3><font-awesome-icon icon="code-branch" /> {{ sessionName }}</h3>
      </div>
    </div>
    <div
      class="row justify-content-md-center"
      v-if="!gameStarted && !loading && !sessionError"
    >
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
        <br />
        <h5>Tarefas Estimadas:</h5>
        <div
          class="layout-white min-margin-bottom"
          v-for="(game, index) in games"
          v-bind:key="index"
        >
          <strong>{{ game }}</strong>
        </div>
      </div>
      <div class="col-lg-8 col-md-10 col-sm-12 col-12">
        <br />
        <hr />
        <br />
        <button type="button" class="btn btn-danger" v-on:click="deleteGame">
          Excluir Sessão <font-awesome-icon icon="trash-alt" />
        </button>
      </div>
    </div>
    <div class="row justify-content-md-center" v-if="gameStarted">
      <div class="col-lg-8 col-md-8 col-sm-12 col-12">
        <div class="layout">
          <label>Descrição da Tarefa:</label>
          <h4>{{ game.title }}</h4>
          <div class="alert alert-info" role="alert" v-if="!users.length">
            Nenhum usuário conectado
          </div>
          <div class="d-flex flex-row bd-highlight mb-3 justify-content-center">
            <div
              v-for="(user, index) in users"
              v-bind:key="index"
              class="p-2 bd-highlight margin-bottom margin-top"
            >
              <font-awesome-icon icon="circle" class="online" /> {{ user }}
              <div class="playing-card playing-card-back">
                <span class="value">?</span>
              </div>
            </div>
          </div>
          <div class="row justify-content-md-center">
            <div class="col-lg-8 col-md-10 col-sm-12 col-12">
              <button type="button" class="btn btn-app" v-on:click="finishGame">
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
import { SessionService } from "../services/sessionService";
import { Common } from "../services/commonService";

export default {
  name: "Admin",
  data() {
    return {
      session: {},
      sessionId: "",
      sessionName: "",
      users: [],
      games: [],
      game: {
        title: "",
        votes: []
      },
      gameStarted: false,
      currentGame: null,
      loading: true,
      sessionError: "",
      addGameError: "",
      issue: ""
    };
  },
  methods: {
    begin() {
      const game = {
        id: Common.generateRandomUUID(),
        title: this.issue,
        votes: []
      };
      SessionService.addGame(this.$route.params.sessionId, game)
        .then(game => {
          this.currentGame = game.id;
          this.gameStarted = true;
        })
        .catch(error => {
          this.addGameError = error;
        });
    },
    startGame() {
      if (!this.session.games) this.session.games = [];

      this.session.games.push(this.game);
      SessionService.save(this.session).then(
        () => {
          this.gameStarted = true;
        },
        error => {
          this.sessionError = error;
        }
      );
    },
    finishGame() {
      this.gameStarted = false;
    },
    deleteGame() {
      this.gameStarted = false;
    },
    refreshSessionData(session) {
      if (session.exists) {
        this.users = session.data().users.map(u => u.name);
      } else {
        this.loginError = "A sessão informada não existe.";
      }
    }
  },
  mounted() {
    if (this.$route.params.sessionId) {
      SessionService.getById(this.$route.params.sessionId).then(
        session => {
          this.session = session;
          this.sessionId = session.id;
          this.sessionName = session.name;
          if (session.users) {
            this.users = session.users.map(u => u.name);
          }
          if (session.games) {
            this.games = session.games.map(g => g.title);
          }
          this.loading = false;
        },
        error => {
          this.sessionError = error;
          this.loading = false;
        }
      );
    }
  }
};
</script>

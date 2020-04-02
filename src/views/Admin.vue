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
          <br />
          <button
            type="button"
            class="btn btn-danger margin-top"
            v-on:click="returnToHome"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
    <div
      class="row justify-content-md-center"
      v-if="!loading && !gameStarted && !sessionError"
    >
      <div class="col-lg-8 col-md-10 col-sm-12 col-12">
        <div class="layout-gray">
          <strong>{{ sessionId }}</strong>
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
      <div class="col-lg-2 col-md-3 col-sm-3 col-12 margin-bottom">
        <div class="layout">
          <h4>Usuários</h4>
          <div class="alert alert-gray" role="alert" v-if="!users.length">
            Nenhum usuário conectado
          </div>
          <div class="text-bold" v-if="users.length">
            <p v-for="(user, index) in users" v-bind:key="index">
              <font-awesome-icon icon="circle" class="online" />
              {{ user }}
              <font-awesome-icon
                icon="times"
                class="float-right btn-delete-user"
                v-on:click="deleteUser(index)"
              />
            </p>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-5 col-sm-9 col-12">
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
              Começar <font-awesome-icon icon="play-circle" />
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
          class="layout-dashed min-margin-bottom"
          v-for="(game, index) in games"
          v-bind:key="index"
        >
          <span class="game">{{ game }}</span>
          <font-awesome-icon
            icon="times"
            class="float-right btn-delete-user"
            v-on:click="deleteGame(index)"
          />
        </div>
      </div>
      <div class="col-lg-8 col-md-10 col-sm-12 col-12">
        <br />
        <hr />
        <br />
        <button
          type="button"
          class="btn btn-gray margin-right"
          v-on:click="returnToHome"
        >
          Voltar <font-awesome-icon icon="undo" />
        </button>
        <button type="button" class="btn btn-danger" v-on:click="deleteSession">
          Excluir Sessão <font-awesome-icon icon="trash-alt" />
        </button>
      </div>
    </div>
    <div class="row justify-content-md-center" v-if="gameStarted">
      <div class="col-lg-12 col-md-12 col-sm-12 col-12">
        <div class="layout">
          <label>Descrição da Tarefa:</label>
          <h4>{{ game.title }}</h4>
          <div class="alert alert-gray" role="alert" v-if="!game.votes.length">
            Nenhum usuário conectado
          </div>
          <div
            class="d-flex flex-wrap flex-row bd-highlight mb-3 justify-content-md-center"
          >
            <div
              v-for="(vote, index) in game.votes"
              v-bind:key="index"
              class="bd-highlight justify-content-center margin-bottom margin-top p-2"
            >
              <font-awesome-icon
                icon="circle"
                class="online min-margin-right"
              />
              <span class="text-bold">{{ vote.user.name }}</span>
              <div
                class="playing-card playing-card-back d-flex flex-column justify-content-center"
                v-if="!vote.number && !shouldShowCards"
              />
              <div
                class="playing-card playing-card-front d-flex flex-column justify-content-center"
                v-if="vote.number && !shouldShowCards"
              >
                <span class="value">?</span>
              </div>
              <div
                class="playing-card playing-card-front d-flex flex-column justify-content-center"
                v-if="vote.number && shouldShowCards"
              >
                <span class="value">{{ vote.number }}</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            class="btn btn-gray margin-bottom"
            v-on:click="finishGame"
          >
            Encerrar <font-awesome-icon icon="hourglass-end" />
          </button>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import { SessionService } from "../services/sessionService";

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
        id: "",
        title: "",
        votes: []
      },
      gameStarted: false,
      shouldShowCards: false,
      loading: true,
      sessionError: "",
      addGameError: ""
    };
  },
  methods: {
    startGame() {
      SessionService.addGame(this.session, this.game).then(
        game => {
          this.game = game;
          this.gameStarted = true;
          this.shouldShowCards = false;
        },
        error => {
          this.sessionError = error;
        }
      );
    },
    finishGame() {
      this.gameStarted = false;
      this.game = {};
    },
    deleteSession() {
      SessionService.delete(this.session).then(
        () => this.returnToHome(),
        error => {
          this.sessionError = error;
        }
      );
    },
    refreshSessionData(session) {
      this.session = session;
      this.sessionId = session.id;
      this.sessionName = session.name;
      if (session.users) {
        this.users = session.users.map(u => u.name);
      }
      if (session.games) {
        this.games = session.games.map(g => g.title);
        this.game = session.games.find(g => g.id === this.game.id) || this.game;
      }
      this.shouldShowCards = SessionService.shouldShowCards(session, this.game);
      this.loading = false;
    },
    returnToHome() {
      this.$router.push("/");
    },
    deleteUser(index) {
      this.session.users.splice(index, 1);
      this.saveSession();
    },
    deleteGame(index) {
      this.session.games.splice(index, 1);
      this.saveSession();
    },
    saveSession() {
      SessionService.save(this.session).then(
        () => {},
        error => {
          this.sessionError = error;
        }
      );
    }
  },
  mounted() {
    if (this.$route.params.sessionId) {
      SessionService.takeSnapshot(
        this.$route.params.sessionId,
        this.refreshSessionData,
        error => {
          this.sessionError = error;
          this.loading = false;
        }
      );
    }
  }
};
</script>

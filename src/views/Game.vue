<template>
  <div class="container-fluid">
    <div class="row justify-content-md-center" v-if="loading">
      <div class="col-lg-8 col-md-10 col-sm-12 col-12">
        <div>
          <font-awesome-icon class="spin" icon="spinner" />
        </div>
      </div>
    </div>
    <div class="row justify-content-center" v-if="!loading">
      <div class="col-lg-12 col-md-12 col-sm-12 col-12">
        <h3><font-awesome-icon icon="code-branch" /> {{ session.name }}</h3>
        <h4 class="margin-top">{{ game ? game.title : "Nenhuma tarefa" }}</h4>
        <div class="layout">
          <font-awesome-icon icon="circle" class="online min-margin-right" />
          <span class="text-bold">{{ currentUser.name }}</span>
          <div
            class="alert alert-gray margin-top"
            role="alert"
            v-if="!this.game.id"
          >
            Aguardando Administrador
          </div>
          <div
            class="d-flex flex-wrap flex-row bd-highlight mb-3 justify-content-md-center"
            v-if="this.game.id"
          >
            <div
              v-for="(point, index) in points"
              v-bind:key="index"
              class="bd-highlight justify-content-center margin-bottom margin-top p-2"
            >
              <div
                class="playing-card playing-card-front d-flex flex-column justify-content-center"
                v-bind:class="{ selected: point === selectedNumber }"
                @click="vote(point)"
              >
                <span
                  class="value"
                  v-bind:class="{ selected: point === selectedNumber }"
                  >{{ point }}</span
                >
              </div>
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
import { Common } from "../services/commonService";

export default {
  name: "Game",
  props: {
    user: Object
  },
  data() {
    return {
      currentUser: Common.getFromLocalStorageAsObject("user"),
      points: [1, 2, 3, 5, 8, 13, 21, 34],
      game: {},
      description: "",
      userVote: null,
      voteError: "",
      selectedNumber: 0,
      session: {},
      loading: true
    };
  },
  methods: {
    vote(number) {
      this.userVote.number = number;
      SessionService.vote(
        this.$route.params.sessionId,
        this.game,
        this.userVote
      ).then(
        vote => {
          this.selectedNumber = vote.number;
        },
        error => {
          this.voteError = error;
          this.selectedNumber = 0;
        }
      );
    },
    refreshSessionData(session) {
      this.session = session;
      var games = session.games || [];
      this.game = games.filter(g => g.status === "STARTED").pop() || {};
      if (this.game.id) {
        this.userVote =
          this.game.votes.find(v => v.user.id === this.currentUser.id) || {};
      } else {
        this.selectedNumber = 0;
      }
      this.loading = false;
    }
  },
  created() {
    SessionService.takeSnapshot(
      this.$route.params.sessionId,
      this.refreshSessionData
    );
  }
};
</script>

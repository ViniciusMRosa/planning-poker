<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-lg-12 col-md-12 col-sm-12 col-12">
        <h3>{{ game ? game.title : "Nenhuma tarefa" }}</h3>
        <div class="layout">
          <div class="d-flex flex-wrap flex-row bd-highlight mb-3">
            <div
              v-for="(point, index) in points"
              v-bind:key="index"
              class="bd-highlight justify-content-center margin-bottom margin-top p-2"
            >
              <div
                class="playing-card playing-card-front d-flex flex-column justify-content-center"
              >
                <span class="value" @click="vote(point)">{{ point }}</span>
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
      names: [],
      newName: "",
      userVote: null,
      voteError: ""
    };
  },
  methods: {
    ruffle() {
      var index = Math.floor(Math.random() * this.names.length);
      var drawn = this.names[index];
      this.$router.push({
        name: "Ruffle",
        params: {
          description: this.description,
          names: this.names,
          drawn: drawn
        }
      });
    },
    vote(number) {
      this.userVote.number = number;
      SessionService.vote(
        this.$route.params.sessionId,
        this.game,
        this.userVote
      )
        .then(vote => {
          this.selected = vote.number;
        })
        .catch(error => {
          this.voteError = error;
          this.selected = 0;
        });
    },
    remove(index) {
      this.names.splice(index, 1);
    },
    refreshSessionData(session) {
      this.session = session;
      var games = session.games || [];
      this.game = games.pop();
      this.userVote =
        this.game.votes.filter(v => v.user.id === this.currentUser.id)[0] || {};
    }
  },
  created() {
    SessionService.takeSnapshot(
      this.$route.params.sessionId,
      this.refreshSessionData
    );
  },
  mounted() {
    if (this.$route.params.names && this.$route.params.description) {
      this.description = this.$route.params.description;
      this.names = this.$route.params.names;
    } else {
      this.description = "Basal da Semana";
      this.names = ["Hugo", "Leo", "Mari", "Naty", "Vini"];
    }
    this.newName = "";
  }
};
</script>

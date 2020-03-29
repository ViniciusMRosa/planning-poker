<template>
  <div class="container-fluid home">
    <div class="row justify-content-md-center">
      <div class="col-lg-6 col-md-5 col-sm-12 col-12">
        <h3>{{ game ? game.title : "Nenhuma tarefa" }}</h3>
        <div class="layout">
          <h4>Novo Jogo</h4>
          <div class="form-group">
            <label for="exampleInputPassword1">Descrição da Tarefa:</label>
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
  name: "Home",
  props: {
    user: Object
  },
  data() {
    return {
      game: {},
      description: "",
      names: [],
      newName: ""
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
    remove(index) {
      this.names.splice(index, 1);
    },
    refreshSessionData(session) {
      var games = session.games || [];
      console.log("Games", games);
      this.game = games.pop();
    }
  },
  created() {
    SessionService.takeSnapshot(
      this.$route.params.sessionId,
      this.refreshSessionData
    );
  },
  mounted() {
    console.log("Session:", this.$route.params.sessionId, " user ", this.user);
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

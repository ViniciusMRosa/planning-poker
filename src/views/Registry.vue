<template>
  <div class="container-fluid registry">
    <div class="row justify-content-md-center">
      <div class="col-lg-5 col-md-6 col-sm-12 col-12">
        <h3>Entrar em um Jogo</h3>
        <div class="form-group">
          <label>Informe seu nome:</label>
          <input
            type="text"
            class="form-control text-center"
            id="name"
            v-model="name"
            aria-describedby="nameHelp"
          />
          <small
            v-if="!name"
            id="nameHelp"
            class="form-text text-muted text-danger"
            >Campo obrigatório.</small
          >
        </div>
        <button
          type="button"
          class="btn btn-app btn-ruffle"
          v-on:click="login"
          :disabled="!name"
        >
          Entrar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Registry",
  data() {
    return {
      name: ""
    };
  },
  methods: {
    login() {
      this.$router.push({
        name: "Game"
      });
    }
  }
};
</script>

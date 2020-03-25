<template>
  <div class="container-fluid home">
    <div class="row justify-content-md-center">
      <div class="col-lg-5 col-md-8">
        <h3>Novo Jogo!</h3>
        <div class="form-group">
          <input
            type="text"
            class="form-control text-center"
            id="description"
            v-model="description"
            aria-describedby="descriptionHelp"
          />
          <small
            v-if="!description"
            id="descriptionHelp"
            class="form-text text-muted text-danger"
            >Campo obrigatório.</small
          >
        </div>
        <button
          type="button"
          class="btn btn-app btn-ruffle"
          v-on:click="begin"
          :disabled="!description"
        >
          Jogar
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
      description: "Planejamento de Tarefas"
    };
  },
  methods: {
    begin() {
      this.$router.push({
        name: "Admin",
        params: {
          description: this.description
        }
      });
    }
  }
};
</script>

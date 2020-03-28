<template>
  <div class="container-fluid home">
    <div class="row justify-content-md-center">
      <div class="col-lg-3 col-md-6">
        <h3>Novo Sorteio</h3>
        <div class="form-group">
          <input
            type="text"
            class="form-control text-center"
            id="description"
            v-model="description"
            aria-describedby="descriptionHelp"
            placeholder="Informe a descrição do sorteio">
          <small
            v-if="!description"
            id="descriptionHelp"
            class="form-text text-muted text-danger"
            >Campo obrigatório.</small
          >
        </div>
      </div>
    </div>
    <br />
    <div class="row justify-content-md-center">
      <div class="col-lg-12 col-md-12 col-sm-12 col-12">
        <h3>Nomes</h3>
      </div>
      <div class="col-lg-2 col-md-5 col-sm-8 col-8">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="newName"
            aria-describedby="nameHelp"
            placeholder="Informe um novo nome"
          />
        </div>
      </div>
      <div class="col-lg-1 col-md-3 col-sm-4 col-4">
        <button type="button" class="btn btn-app" v-on:click="add(index)">
          Adicionar
        </button>
      </div>
    </div>
    <div class="row justify-content-md-center">
      <div class="col-lg-3 col-md-8 col-sm-12 col-12">
        <div class="alert alert-warning" role="alert" v-if="!names.length">
          Informe alguns nomes para sortear
        </div>
        <table class="table table-striped table-hover" v-if="names.length">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(name, index) in names" v-bind:key="index">
              <th scope="row">
                {{ index + 1 }}
              </th>
              <td>
                {{ name }}
              </td>
              <td>
                <span
                  class="cursor-pointer text-danger"
                  v-on:click="remove(index)"
                >
                  <font-awesome-icon icon="trash-alt" />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row justify-content-md-center">
      <div class="col-lg-3 col-md-6">
        <button
          type="button"
          class="btn btn-app btn-ruffle"
          v-on:click="ruffle"
          :disabled="!names.length || !description"
        >
          Sortear!
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  props:{
    user: Object
  },
  data() {
    return {
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
    add() {
      if (this.newName) {
        this.names.push(this.newName);
      }
    },
    remove(index) {
      this.names.splice(index, 1);
    }
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

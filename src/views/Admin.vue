<template>
  <div class="container-fluid admin">
    <div class="row justify-content-md-center">
      <div class="col-lg-5 col-md-8">
        <h3>{{ description }}</h3>
      </div>
    </div>
    <br />
    <div class="row justify-content-md-center">
      <div class="col-lg-6 col-md-6 col-sm-12 col-12 layout">
        <div class="alert alert-info" role="alert" v-if="!users.length">
          Nenhum usuário conectado
        </div>
        <ul class="list-group" v-if="users.length">
          <li
            class="list-group-item"
            v-for="(user, index) in users"
            v-bind:key="index"
          >
            {{ user }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      description: "",
      users: ["Hugo", "Leo", "Mari", "Naty", "Vini"]
    };
  },
  methods: {

  },
  mounted() {
    if (this.$route.params.description) {
      this.description = this.$route.params.description;
    } else {
      this.description = "Teste";
    }
  }
};
</script>

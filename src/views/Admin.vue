<template>
  <div class="container-fluid admin">
    <div class="row justify-content-md-center">
      <div class="col-lg-8 col-md-10">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Início</a></li>
            <li class="breadcrumb-item active" aria-current="page">Admin</li>
          </ol>
        </nav>
      </div>
    </div>
    <div class="row justify-content-md-center">
      <div class="col-lg-8 col-md-10">
        <h3>{{ description }}</h3>
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
            <label for="exampleInputPassword1">Descrição da Tarefa:</label>
            <input
              type="text"
              class="form-control text-center"
              id="description"
              v-model="issue"
              aria-describedby="descriptionHelp"
            />
            <small
              v-if="!issue"
              id="descriptionHelp"
              class="form-text text-muted text-danger"
              >Campo obrigatório.</small
            >
            <button
              type="button"
              class="btn btn-app btn-ruffle"
              v-on:click="begin"
              :disabled="!issue"
            >
              Começar
            </button>
          </div>
        </div>
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
            <div class="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
              <button
                type="button"
                class="btn btn-app btn-ruffle"
                v-on:click="end"
                :disabled="!description"
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
import { sessionsCollection } from "../main"
export default {
  name: "Admin",
  data() {
    return {
      description: "",
      users: ["Hugo", "Leo", "Mari", "Naty", "Vini"],
      games: [
        "Carregar categoria na edição dos contratos",
        "Voltar opção de cadastro de categoria na modal do financeiro",
        "Bug de anexos",
        "Criar front da criação de conta contábil analítica"
      ],
      gameStarted: false,
      issue: ""
    };
  },
  methods: {
    begin() {
      this.gameStarted = true;
    },
    end() {
      this.gameStarted = false;
    }
  },
  mounted() {

    if(this.$route.params.sessionId){
      sessionsCollection
        .doc(this.$route.params.sessionId)
        .get()
        .then(session => {
          if (session.exists) {
            this.users =  session.data().users.map( u => u.name);
          } else {
            this.loginError = "A sessão informada não existe.";
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    if (this.$route.params.description) {
      this.description = this.$route.params.description;
    } else {
      this.description = "Teste";
    }
  }
};
</script>

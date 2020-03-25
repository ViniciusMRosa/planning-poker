import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import Registry from "../views/Registry.vue";
import Game from "../views/Game.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin
  },
  {
    path: "/registry",
    name: "Registry",
    component: Registry
  },
  {
    path: "/game",
    name: "Game",
    component: Game
  }
];

const router = new VueRouter({
  routes
});

export default router;

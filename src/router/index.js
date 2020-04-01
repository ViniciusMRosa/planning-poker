import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import Game from "../views/Game.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/:sessionId/admin",
    name: "Admin",
    component: Admin
  },
  {
    name: "Game",
    path: "/:sessionId/game",
    component: Game,
    props: true
  }
];

const router = new VueRouter({
  routes
});

export default router;

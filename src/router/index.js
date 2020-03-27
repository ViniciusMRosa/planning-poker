import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import Game from "../views/Game.vue";
import Registry from "../views/Registry.vue";

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
    path: "/:sessionId/game",
    component: Game
  },
  {
    path: "/:sessionId/registry",
    component: Registry
  }
];

const router = new VueRouter({
  routes
});

export default router;

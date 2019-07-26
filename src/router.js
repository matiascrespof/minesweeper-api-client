import Vue from "vue";
import Router from "vue-router";
import newGame from "./components/NewGame.vue";
//import GetGame from "./components/GetGame.vue";
 
Vue.use(Router);
 
export default new Router({
    mode: "history",
    routes: [
      {
        path: "/startNewGame",
        name: "startNewGame",
        component: newGame
      }
      // ,
      // {
      //   path: "/getGame/:gameId",
      //   name: "getGame",
      //   component: GetGame
      // }
    ]
  });
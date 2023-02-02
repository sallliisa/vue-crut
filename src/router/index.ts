import { createRouter, createWebHistory } from "vue-router";
import Products from "../views/Products.vue";
import Login from "../views/Login.vue";
import axios from "axios";
import {useUserStore} from "../stores/user";
import Dashboard from "../views/Dashboard.vue"
import UOMs from "../views/UOMs.vue"
import Playground from "@/views/Playground.vue";
import PlaygroundOne from "@/views/PlaygroundOne.vue"
import PlaygroundTwo from "@/views/PlaygroundTwo.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: Dashboard,
    },
    {
      path: "/products",
      name: "Products",
      component: Products,
    },
    {
      path: "/uoms",
      name: "UOMs",
      component: UOMs,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/playground",
      name: "Playground",
      component: Playground,
      children: [
        {
          path: "/playground/one",
          name: "Playground - One",
          component: PlaygroundOne,
        },
        {
          path: "/playground/two",
          name: "Playground - Two",
          component: PlaygroundTwo
        }
      ]
    },
  ],
});

export default router;

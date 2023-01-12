import { createRouter, createWebHistory } from "vue-router";
import Manage from "../views/Manage.vue";
import Login from "../views/Login.vue";
import axios from "axios";
import {useUserStore} from "../stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Manage",
      component: Manage,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.name != 'Login') {
    const response = await axios.get('https://pos.zzidzz.tech/products')
    if (response.status === 200) {
      console.log('Logged in')
      next()
    }
    else {
      console.log('bounced back')
      useUserStore().deleteUser()
      next('/login')
    }
  } else {
    next()
  }
})

export default router;

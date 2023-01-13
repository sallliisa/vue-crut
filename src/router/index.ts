import { createRouter, createWebHistory } from "vue-router";
import Products from "../views/Products.vue";
import Login from "../views/Login.vue";
import axios from "axios";
import {useUserStore} from "../stores/user";
import Dashboard from "../views/Dashboard.vue"
import UOMs from "../views/UOMs.vue"

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
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.name != 'Login') {
    if (useUserStore().user.auth) {
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
      next('/login')
    }
  } else {
    next()
  }
})

export default router;

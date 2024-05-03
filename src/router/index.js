// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/authStore";
import AuthView from "../views/AuthView.vue";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: AuthView, meta: { requiresAuth: false } },
    { path: "/home", component: HomeView, meta: { requiresAuth: true } },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // Obtén la instancia del store aquí

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next("/");
  } else {
    next();
  }
});

export default router;

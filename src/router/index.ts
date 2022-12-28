import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "MainLayout",
      redirect: "/home",
      component: () => import("../app/Layout/ui/views/MainLayout.vue"),
      children: [
        { path: "/home", name: "HomeView", component: () => import("../app/modules/Home/ui/views/Index.vue") },
        { path: "/user", name: "UserView", component: () => import("../app/modules/User/ui/views/Index.vue") },
      ],
    },
    {
      path: "/",
      name: "AuthLayout",
      redirect: "/login",
      component: () => import("../app/Layout/ui/views/AuthLayout.vue"),
      children: [
        { path: "/login", name: "LoginView", component: () => import("../app/modules/Auth/ui/views/Login.vue") },
        { path: "/register", name: "RegisterView", component: () => import("../app/modules/Auth/ui/views/Register.vue") },
      ],
    },
  ],
});

export default router;

import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "MainLayout",
    redirect: "/home",
    beforeEnter: async (to, from, next) => {
      const { currentUser } = useFirebaseAuth();

      if (!(await currentUser())) next({ path: "/login" });
      else next();
    },
    component: () => import("@/layout/views/MainLayout.vue"),
    children: [
      { path: "/home", name: "HomeView", component: () => import("../views/Home/Index.vue") },
      { path: "/user", name: "UserView", component: () => import("../views/User/Index.vue") },
    ],
  },
  {
    path: "/",
    name: "AuthLayout",
    redirect: "/login",
    component: () => import("@/layout/views/AuthLayout.vue"),
    children: [
      { path: "/login", name: "LoginView", component: () => import("@/views/Auth/Login.vue") },
      { path: "/register", name: "RegisterView", component: () => import("@/views/Auth/Register.vue") },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

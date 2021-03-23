import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: "about" */ "@/views/about.vue")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import(/* webpackChunkName: "dashboard" */ "@/views/dashboard.vue")
  },
  {
    path: "/jobs",
    name: "Jobs",
    component: () => import(/* webpackChunkName: "jobs" */ "@/views/jobs.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/login.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
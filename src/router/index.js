import { getUser } from "../services/authentication";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/home.vue"),
    meta: {
      authorized: true
    }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import(/* webpackChunkName: "dashboard" */ "../views/dashboard.vue"),
    meta: {
      authorized: true
    }
  },
  {
    path: "/administrators",
    name: "Administrators",
    component: () => import(/* webpackChunkName: "administrators" */ "../views/administrators.vue"),
    meta: {
      authorized: true
    }
  },
  {
    path: "/jobs",
    name: "Jobs",
    component: () => import(/* webpackChunkName: "jobs" */ "../views/jobs.vue"),
    meta: {
      authorized: true
    }
  },
  {
    path: "/technicians",
    name: "Technicians",
    component: () => import(/* webpackChunkName: "technicians" */ "../views/technicians.vue"),
    meta: {
      authorized: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "../views/login.vue"),
    meta: {
      hideMenu: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Check for the user and inject dependencies on each navigation.
router.beforeEach((to, _, next) => {
  // Check to see if authorization is required. Redirect if the user isn't logged in.
  let user = getUser();
  if (to.meta.authorized === true && !user) {
    next({ name: "Login" });
    return;
  }

  next();
});

export default router;
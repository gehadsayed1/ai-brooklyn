import { createRouter, createWebHistory } from "vue-router";
import { useLoginWithGoogleStore } from "../stores/LoginWithGoogle";


const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/LandingPage.vue"),
  },
  {
    path: "/service-details",
    name: "ServiceDetails",
    component: () => import("../views/ServiceDetails.vue"),
  },
  {
    path: "/business-instructor",
    name: "BusinessInstructor",
    component: () => import("../views/BusinessInstructor.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/models",
    name: "Models",
    component: () => import("../views/Models.vue"),
    props: route => ({
      token: route.query.token,
      acs: route.query.acs,
      user: route.query.user,
    }),
    meta: { requiresAuth: true }
  },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const store = useLoginWithGoogleStore();

  if (to.meta.requiresAuth) {
    const isLoggedIn = store.checkAuth();
    if (!isLoggedIn) {
      next("/");
    } else {
      next();
    }
  } else {
    
    if (to.path === "/login" && store.checkAuth()) {
      next("/models");
    } else {
      next();
    }
  }
});

export default router;

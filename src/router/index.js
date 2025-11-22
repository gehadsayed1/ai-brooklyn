import { createRouter, createWebHistory } from "vue-router";
import { useLoginWithGoogleStore } from "../stores/LoginWithGoogle";
import { useGoogleAnalytics } from "../composables/useGoogleAnalytics";

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
    path: "/model/:slug",
    name: "ModelPage",
    component: () => import("../views/ModelPage.vue"),
  },

  {
    path: "/models",
    name: "Models",
    component: () => import("../views/Models.vue"),
    props: (route) => ({
      token: route.query.token,
      acs: route.query.acs,
      user: route.query.user,
    }),
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  next();
  return;
});

router.afterEach((to) => {
  const { trackPageView } = useGoogleAnalytics();
  trackPageView(to.path);
});

export default router;

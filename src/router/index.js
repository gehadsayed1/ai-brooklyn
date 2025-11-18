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
    meta: { requiresAuth: false }
  },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach(async (to, from, next) => {
   next();
  return;
  const store = useLoginWithGoogleStore();
  const isLoggedIn = await store.checkAuth();


  if (to.path === "/" && isLoggedIn && store.checkBotAccess()) {
    next("/models");
    return;
  }

 
  if (to.path === "/" || to.path === "/service-details") {
    next();
    return;
  }


  if (to.path === "/models" || to.path === "/business-instructor") {
    if (isLoggedIn && store.checkBotAccess()) {
      next();
    } else {
      next("/");
    }
    return;
  }


  next("/");
});


router.afterEach((to) => {
  // next(); return;
  const { trackPageView } = useGoogleAnalytics();
  trackPageView(to.path);
});

export default router;

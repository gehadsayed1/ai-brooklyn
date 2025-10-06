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
    meta: { requiresAuth: false }
  },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const store = useLoginWithGoogleStore();
  const isLoggedIn = store.checkAuth();

  // إذا كان مسجل دخول ويحاول الذهاب للصفحة الرئيسية أو ServiceDetails، يتم إرساله إلى Models
  if (isLoggedIn && (to.path === "/" || to.path === "/service-details")) {
    next("/models");
    return;
  }

  // التحقق من الصفحات التي تحتاج تسجيل دخول
  if (to.meta.requiresAuth) {
    if (!isLoggedIn) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

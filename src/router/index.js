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


router.beforeEach(async (to, from, next) => {
  const store = useLoginWithGoogleStore();
  const isLoggedIn = await store.checkAuth();

  // السماح بالدخول للصفحات العامة للجميع
  if (to.path === "/" || to.path === "/service-details") {
    next();
    return;
  }

  // حماية الصفحات المحمية (models, business-instructor)
  if (to.path === "/models" || to.path === "/business-instructor") {
    if (isLoggedIn) {
      next();
    } else {
      next("/");
    }
    return;
  }

  // أي مسار آخر غير معروف
  next("/");
});

export default router;

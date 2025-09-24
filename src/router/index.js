import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

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
    props: (route) => ({
      token: route.query.token,
      acs: route.query.acs,
      user: route.query.user ? JSON.parse(route.query.user) : null,
    }),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

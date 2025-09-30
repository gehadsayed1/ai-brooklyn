import { createRouter, createWebHistory } from "vue-router";

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
  
  },
   {
  path: "/models",
  name: "models",
  component: () => import("../views/Models.vue"),
  props: route => ({
    token: route.query.token,
    acs: route.query.acs,
    user: route.query.user
  })
}


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

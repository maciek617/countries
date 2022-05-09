import { createRouter, createWebHistory } from "vue-router";
import MainApp from "@/views/MainApp";
import CountryView from "@/components/CountryView";

const routes = [
  {
    path: "/",
    name: "home",
    component: MainApp,
  },
  {
    path: "/country/:slug",
    name: "country",
    component: CountryView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

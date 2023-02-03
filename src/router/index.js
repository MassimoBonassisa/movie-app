import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";


const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/film",
    name: "film",
    component: () => import("../views/FilmView.vue"),
  },
  {
    path: "/serie",
    name: "serie",
    component: () => import("../views/SerieTV.vue"),
  },
  
  { 
    path: "/details/films/:id",
    name: "filmDetail",
    component: () => import("../views/DetailsFilms.vue")},

  { 
    path: "/details/series/:id",
    name: "tvDetail",
    component: () => import("../views/DetailsSeries.vue")}
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

 
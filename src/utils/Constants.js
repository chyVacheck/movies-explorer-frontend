// ? год создания сайта
export const YEAR = 2023;

// ? роутеры на которых отображается Header, Footer
export const activeHeaderRoutes = ["/", "/movies", "/saved-movies", "/profile"];
export const activeFooterRoutes = ["/", "/movies", "/saved-movies"];

// ? все пути
export const paths = {
  aboutProject: "/",
  login: "/signin",
  registration: "/signup",
  movies: "/movies",
  savedMovies: "/saved-movies",
  profile: "/profile",
  pageNotFound: "/PageNotFound",
};

// ? объекты для навигационной панели
export const headerNavigationRouters = [
  {
    place: ["BurgerMenu"],
    context: "Главная",
    router: paths.aboutProject,
  },
  {
    place: ["header", "BurgerMenu"],
    context: "Фильмы",
    router: paths.movies,
  },
  {
    place: ["header", "BurgerMenu"],
    context: "Сохранённые фильмы",
    router: paths.savedMovies,
  },
];

export const mainNavigationRouters = [
  {
    context: "О проекте",
    router: "",
  },
  {
    context: "Технологии",
    router: "",
  },
  {
    context: "Студент",
    router: "",
  },
];

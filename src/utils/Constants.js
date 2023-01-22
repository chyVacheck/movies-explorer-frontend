
// ? роутеры на которых не отображается нав.панель и кнопка
export const unActiveNavbarAndButtonRouters = ['/signin', '/signup'];

// ? все пути
export const paths = {
  aboutProject: '/',
  login: '/signin',
  registration: '/signup',
  movies: '/movies',
  savedMovies: '/saved-movies',
  profile: '/profile',
}

// ? объекты для навигационной панели
export const navigationRouters = [
  {
    context: 'Фильмы',
    router: paths.movies
  },
  {
    context: 'Сохранённые фильмы',
    router: paths.savedMovies
  },
]

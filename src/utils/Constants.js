// ? год создания сайта
export const YEAR = 2023;

// ? роутеры на которых отображается Header, Footer
export const activeHeaderRoutes = ['/', '/movies', '/saved-movies', '/profile'];
export const activeFooterRoutes = ['/', '/movies', '/saved-movies'];

// ? все пути
export const paths = {
  aboutProject: '/',
  login: '/signin',
  registration: '/signup',
  movies: '/movies',
  savedMovies: '/saved-movies',
  profile: '/profile',
  pageNotFound: '/PageNotFound',
};

// ? объекты для навигационной панели
export const headerNavigationRouters = [
  {
    place: ['BurgerMenu'],
    context: 'Главная',
    router: paths.aboutProject,
  },
  {
    place: ['header', 'BurgerMenu'],
    context: 'Фильмы',
    router: paths.movies,
  },
  {
    place: ['header', 'BurgerMenu'],
    context: 'Сохранённые фильмы',
    router: paths.savedMovies,
  },
];

export const mainNavigationRouters = [
  {
    context: 'О проекте',
    id: 'about-project',
  },
  {
    context: 'Технологии',
    id: 'techs',
  },
  {
    context: 'Студент',
    id: 'about-me',
  },
];

export const VALIDATION = {
  NAME: {
    MIN: 2,
    MAX: 30,
  },
  EMAIL: {
    pattern: '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}',
  },
  PASSWORD: {
    MIN: 4,
    MAX: 50,
  },
};

export const status = {
  dev: 'dev',
  prod: 'prod',
};

export const typeOfErrorFromServer = {
  failFetch: {
    all: 'Нет связи с сервером',
  },
  login: {
    400: 'Вы ввели неправильный логин или пароль',
    401: 'Вы ввели неправильный логин или пароль',
    403: 'Вы ввели неправильный логин или пароль',
    404: 'Пользователя с такой почтой нет',
    409: null,
    429: null,
  },
  register: {
    400: 'Проверьте введенные данные',
    401: null,
    403: null,
    404: null,
    409: 'Пользователь с таким email уже существует',
    429: 'Слишком большое количество запросов, на регистрацию попробуйте позже',
  },
  setNewInfo: {
    400: 'Проверьте введенные данные',
    401: null,
    403: null,
    404: null,
    409: 'Пользователь с таким email уже существует',
    429: 'Слишком большое количество запросов, на смену данных попробуйте позже',
  },
};

export const NUMBER_OF_MOVIES_TO_RENDER = {
  LAPTOP: {
    start: 12,
    more: 3,
  },
  TABLET: {
    start: 8,
    more: 2,
  },
  PHONE: {
    start: 5,
    more: 2,
  },
};

export const SHORT_MOVIE_DURATION = 40;

export const localStorageNames = {
  shortFilm: {
    'saved-movies': 'shortFilm-saved-movies',
    movies: 'shortFilm-movies',
  },
  searchWordName: {
    movies: 'searchWord-movies',
  },
};

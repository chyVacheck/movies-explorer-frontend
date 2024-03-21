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
    context: 'Main',
    router: paths.aboutProject,
  },
  {
    place: ['header', 'BurgerMenu'],
    context: 'Films',
    router: paths.movies,
  },
  {
    place: ['header', 'BurgerMenu'],
    context: 'Saved film',
    router: paths.savedMovies,
  },
];

export const mainNavigationRouters = [
  {
    context: 'About project',
    id: 'about-project',
  },
  {
    context: 'Techs',
    id: 'techs',
  },
  {
    context: 'About me',
    id: 'about-me',
  },
];

export const VALIDATION = {
  NAME: {
    MIN: 2,
    MAX: 30,
  },
  EMAIL: {
    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
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
    all: 'No connection with server',
  },
  login: {
    400: 'Wrong password or email',
    401: 'Wrong password or email',
    403: 'Wrong password or email',
    404: 'Do not have user with current emil',
    409: null,
    429: null,
  },
  register: {
    400: 'Check entered data',
    401: null,
    403: null,
    404: null,
    409: 'User with current email already registered',
    429: 'Too many requests, to register info, try later',
  },
  setNewInfo: {
    400: 'Check entered data',
    401: null,
    403: null,
    404: null,
    409: 'User with current email already registered',
    429: 'Too many requests, to update info, try later',
  },
};

export const NUMBER_OF_MOVIES_TO_RENDER = {
  LAPTOP: {
    widthEnd: 1282,
    start: 12,
    more: 3,
  },
  TABLET: {
    widthStart: 1282,
    widthEnd: 762,
    start: 8,
    more: 2,
  },
  PHONE: {
    widthStart: 762,
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

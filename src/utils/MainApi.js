// ? configs
import configApi from './../config/configApi.json';
import configSite from './../config/configSite.json';
// ? constants
import { status } from './../utils/Constants';

class MainApi {
  constructor(setting) {
    this._address = setting.baseUrl;
    this._credentials = setting.credentials;
    this._headers = setting.headers;
  }

  // проверка ответа от сервера
  _checkResponse(res, message = '') {
    // тут проверка ответа
    if (res.ok) {
      // во время dev выводим в консоль
      if (configSite.status === status.dev)
        console.log(
          `Request to server [${this._address}]${
            message ? ' to [' + message + ']' : ''
          } successful proceed`,
        );
      return res.json();
    }

    // ? ошибки
    // 429 лимит запросов
    if (res.status === 429) {
      const err = {
        message: res.statusText,
        status: 429,
      };
      // возвращаем ошибку
      return Promise.reject(err);
    }
    // остальные ошибки
    const error = res.json();
    return error.then((errorObj) =>
      Promise.reject({
        message: errorObj.message,
        status: res.status,
      }),
    );
  }

  // запрос на сервер
  async _request(url, options, message) {
    const res = await fetch(url, options);
    return this._checkResponse(res, message);
  }

  /* авторизация пользователя
    user = {
      email: email,
      password: password,
  }*/
  authorization(user) {
    return this._request(
      `${this._address}/signin`,
      {
        method: 'POST',
        credentials: this._credentials,
        headers: this._headers,
        body: JSON.stringify(user),
      },
      'авторизации',
    );
  }

  /* регистрация пользователя
    user = {
      name: name,
      email: email,
      password: password,
  }*/
  registration(user) {
    return this._request(
      `${this._address}/signup`,
      {
        method: 'POST',
        credentials: this._credentials,
        headers: this._headers,
        body: JSON.stringify(user),
      },
      'регистрации',
    );
  }

  // получаем данные о пользователе
  getUserInfo() {
    return this._request(
      `${this._address}/users/me`,
      {
        method: 'GET',
        credentials: this._credentials,
        headers: this._headers,
      },
      'получения данных о пользователе',
    );
  }

  /* обновление данных о пользователе
    user = {
      name: name,
      email: email
  }*/
  setUserInfo(user) {
    return this._request(
      `${this._address}/users/me`,
      {
        method: 'PATCH',
        credentials: this._credentials,
        headers: this._headers,
        body: JSON.stringify({
          name: user.name,
          email: user.email,
        }),
      },
      'обновления данных о пользователе',
    );
  }

  // выход из системы
  logOut() {
    return this._request(
      `${this._address}/signout`,
      {
        method: 'POST',
        credentials: this._credentials,
        headers: this._headers,
      },
      'выхода из системы',
    );
  }

  // проверка токена
  validationCookie() {
    return this._request(
      `${this._address}/users/me`,
      {
        method: 'GET',
        credentials: this._credentials,
        headers: this._headers,
      },
      'проверки токена',
    );
  }

  // получение сохраненных фильмов
  getMovies() {
    return this._request(
      `${this._address}/movies`,
      {
        method: 'GET',
        credentials: this._credentials,
        headers: this._headers,
      },
      'получить сохраненные фильмы',
    );
  }

  // возвращает все карточки
  saveMovie(movie) {
    return this._request(
      `${this._address}/movies`,
      {
        method: 'POST',
        credentials: this._credentials,
        headers: this._headers,
        body: JSON.stringify({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: movie.image,
          trailerLink: movie.trailerLink,
          thumbnail: movie.thumbnail,
          movieId: movie.movieId,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
        }),
      },
      'сохранить фильм',
    );
  }

  // удаляет фильм из сохраненных
  deleteMovie(id) {
    return this._request(
      `${this._address}/movies/${id}`,
      {
        method: 'DELETE',
        credentials: this._credentials,
        headers: this._headers,
      },
      'убрать фильм из сохраненных',
    );
  }
}

const baseUrl = configApi.Main.BaseUrl[configSite.status];

// настройки для api
const setting = {
  baseUrl: baseUrl,
  credentials: configApi.Main.credentials,
  headers: {
    origin: baseUrl,
    'Content-Type': configApi['Content-Type'],
  },
};

const mainApi = new MainApi(setting);
export default mainApi;

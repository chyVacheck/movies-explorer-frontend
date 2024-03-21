// ? configs
import configApi from './../config/configApi.json';
import configSite from './../config/configSite.json';
// ? constants
import { status } from './../utils/Constants';

class MoviesApi {
  constructor(setting) {
    this._address = setting.baseUrl;
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

  getMovies() {
    return this._request(
      `${this._address}`,
      {
        method: 'GET',
        headers: this._headers,
      },
      'получить данные о фильмах',
    );
  }
}

const baseUrl = configApi.Movies.BaseUrl;

// настройки для api
const setting = {
  baseUrl: baseUrl,
  headers: {
    origin: baseUrl,
    'Content-Type': configApi['Content-Type'],
  },
};

const moviesApi = new MoviesApi(setting);
export default moviesApi;

// ? configs
import configApi from './../config/configApi.json';
import configSite from './../config/configSite.json';
// ? constants
import { status } from './../utils/Constants';

class MainApi {
  constructor(setting) {
    this._adress = setting.baseUrl;
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
          `Запрос на сервер [${this._adress}]${
            message ? ' с целью [' + message + ']' : ''
          } обработан успешно`,
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
      `${this._adress}/signin`,
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
      `${this._adress}/signup`,
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
      `${this._adress}/users/me`,
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
      `${this._adress}/users/me`,
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

  logOut() {
    return this._request(
      `${this._adress}/signout`,
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
      `${this._adress}/users/me`,
      {
        method: 'GET',
        credentials: this._credentials,
        headers: this._headers,
      },
      'проверки токена',
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
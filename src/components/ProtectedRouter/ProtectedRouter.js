// * react
import React from 'react';
import { Navigate } from 'react-router-dom';

// ? стили

// ? компоненты

// ? configs
import configSite from './../../config/configSite.json';

// ? utils
// * константы
import { paths, status } from '../../utils/Constants';
// * utils

// * Api

function ProtectedRoute({ loggedIn, children, page }) {
  // возвращает на стр авторизации + уведомляет в консоли
  // todo сделать вывод информации в поп-ап
  function toLogin() {
    configSite.status === status.dev &&
      console.log(`Попытка зайти на страницу [${page}] не авторизовавшись`);
    return <Navigate to={paths.login} />;
  }

  return loggedIn ? children : toLogin();
}
export default ProtectedRoute;

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

function ProtectedRoute({ isActive, children, page, to = paths.aboutProject }) {
  // перемещает на другую страницу
  // todo сделать вывод информации в поп-ап
  function toAnotherPage() {
    configSite.status === status.dev &&
      console.log(`Попытка зайти на страницу [${page}] не соблюдая правила`);
    return <Navigate to={to} />;
  }

  return isActive ? children : toAnotherPage();
}
export default ProtectedRoute;

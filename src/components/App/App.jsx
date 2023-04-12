// * react
import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

// ? стили
import './App.css';

// ? Context
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// ? компоненты
import Header from '../Header/Header';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import PageNotFound from '../PageNotFound/PageNotFound';

// ? константы
import { paths } from '../../utils/Constants';

function App() {
  // * для отслеживания пути в адресной строке
  const location = useLocation();
  const page = location.pathname;

  // * State`s
  // ? пользователь данные
  const [currentUser, setCurrentUser] = useState({
    name: 'Дмитрий',
    email: 'dima@yandex.ru',
  });

  // ? авторизованость
  const [loggedIn, setLoggedIn] = useState(true);

  // ? активно ли бургерное меню
  const [isActiveBurgerMenu, setIsActiveBurgerMenu] = useState(false);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <section className='App'>
        <Header
          isActiveBurgerMenu={isActiveBurgerMenu}
          setIsActiveBurgerMenu={setIsActiveBurgerMenu}
          loggedIn={loggedIn}
          page={page}
        />

        <Routes>
          {/* //? О проекте */}
          <Route path={paths.aboutProject} element={<Main />} />

          {/* //? Фильмы */}
          <Route exact path={paths.movies} element={<Movies />} />

          {/* //? Сохранённые фильмы */}
          <Route exact path={paths.savedMovies} element={<SavedMovies />} />

          {/* //? Аккаунт */}
          <Route exact path={paths.profile} element={<Profile />} />

          {/* //? Авторизация */}
          <Route exact path={paths.login} element={<Login />} />

          {/* //? Регистрация */}
          <Route exact path={paths.registration} element={<Register />} />

          {/* // * не основные страницы */}

          {/* // ? PageNotFound */}
          <Route exact path={paths.pageNotFound} element={<PageNotFound />} />

          {/* // ? все остальные страницы */}
          <Route
            path='*'
            element={<Navigate to={paths.pageNotFound} replace />}
          />
        </Routes>

        <Footer page={page} />

        {loggedIn && (
          <BurgerMenu
            setIsActive={setIsActiveBurgerMenu}
            isActive={isActiveBurgerMenu}
            loggedIn={loggedIn}
          />
        )}
      </section>
    </CurrentUserContext.Provider>
  );
}

export default App;

// * react
import React, { useState, useEffect } from 'react';
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

// ? utils
// * константы
import { paths } from '../../utils/Constants';
// * Api
import mainApi from './../../utils/MainApi';

function App() {
  // * для отслеживания пути в адресной строке
  const location = useLocation();
  const page = location.pathname;

  // * State`s
  // ? пользовательские данные
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });

  // ? авторизованость
  const [loggedIn, setLoggedIn] = useState(false);

  // ? активно ли бургерное меню
  const [isActiveBurgerMenu, setIsActiveBurgerMenu] = useState(false);

  // проверяем токен jwt
  useEffect(() => {
    mainApi
      .validationCookie('проверки токена')
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          const user = {
            name: res.data.name,
            email: res.data.email,
          };
          setCurrentUser(user);
        }
      })
      .catch((err) => {
        console.log(`Запрос на сервер с целью проверки токена выдал: ${err}`);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <section className='App'>
        <Header
          isActiveBurgerMenu={isActiveBurgerMenu}
          setIsActiveBurgerMenu={setIsActiveBurgerMenu}
          loggedIn={loggedIn}
          page={page}
        />

        <main className='App__container'>
          <Routes>
            {/* //? О проекте */}
            <Route path={paths.aboutProject} element={<Main />} />

            {/* //? Фильмы */}
            <Route exact path={paths.movies} element={<Movies />} />

            {/* //? Сохранённые фильмы */}
            <Route exact path={paths.savedMovies} element={<SavedMovies />} />

            {/* //? Аккаунт */}
            <Route
              exact
              path={paths.profile}
              element={
                <Profile
                  setLoggedIn={setLoggedIn}
                  setCurrentUser={setCurrentUser}
                />
              }
            />

            {/* //? Авторизация */}
            <Route
              exact
              path={paths.login}
              element={
                <Login
                  setLoggedIn={setLoggedIn}
                  setCurrentUser={setCurrentUser}
                />
              }
            />

            {/* //? Регистрация */}
            <Route
              exact
              path={paths.registration}
              element={
                <Register
                  setLoggedIn={setLoggedIn}
                  setCurrentUser={setCurrentUser}
                />
              }
            />

            {/* // * не основные страницы */}

            {/* // ? PageNotFound */}
            <Route exact path={paths.pageNotFound} element={<PageNotFound />} />

            {/* // ? все остальные страницы */}
            <Route
              path='*'
              element={<Navigate to={paths.pageNotFound} replace />}
            />
          </Routes>
        </main>

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

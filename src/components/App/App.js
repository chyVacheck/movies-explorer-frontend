
// ? стили
import './App.css';

// * react
import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// ? Context
import { CurrentUserContext } from './../../contexts/CurrentUserContext.js';

// ? компоненты
import Header from './../Header/Header';

import Main from '../Main/Main';

import Footer from '../Footer/Footer';

// ? константы
import { paths } from './../../utils/Constants';


function App() {

  // * для отслеживания пути в адресной строке
  let location = useLocation();
  const page = location.pathname;

  // * State`s
  // ? пользователь данные
  const [currentUser, setCurrentUser] = useState({});

  //? авторизованость
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <section className="App">

        <Header loggedIn={loggedIn} page={page} />

        <Routes>

          {/* //? О проекте */}
          <Route

            path={paths.aboutProject}
            element={

              <Main />

            }>
          </Route>

          {/* //? Фильмы */}
          <Route exact path={paths.movies}>

          </Route>

          {/* //? Сохранённые фильмы */}
          <Route exact path={paths.savedMovies}>

          </Route>

          {/* //? Аккаунт */}
          <Route exact path={paths.profile}>

          </Route>

          {/* //? Авторизация */}
          <Route exact path={paths.login}>

          </Route>

          {/* //? Регистрация */}
          <Route exact path={paths.registration}>

          </Route>

        </Routes>


        <Footer />

      </section>
    </CurrentUserContext.Provider>
  );
}

export default App;

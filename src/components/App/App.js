// * react
import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// ? стили
import "./App.css";

// ? Context
import { CurrentUserContext } from "./../../contexts/CurrentUserContext.js";

// ? компоненты
import Header from "./../Header/Header";
import Register from "./../Register/Register";
import Login from "./../Login/Login";
import Main from "./../Main/Main";
import Movies from "../Movies/Movies";
import Footer from "./../Footer/Footer";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import PageNotFound from "./../PageNotFound/PageNotFound";

// ? константы
import { paths } from "./../../utils/Constants";

function App() {
  // * для отслеживания пути в адресной строке
  const location = useLocation();
  const page = location.pathname;

  // * State`s
  // ? пользователь данные
  const [currentUser, setCurrentUser] = useState({});

  //? авторизованость
  const [loggedIn, setLoggedIn] = useState(true);

  //? активно ли бургерное меню
  const [isActiveBurgerMenu, setIsActiveBurgerMenu] = useState(false);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <section className="App">
        <Header
          isActiveBurgerMenu={isActiveBurgerMenu}
          setIsActiveBurgerMenu={setIsActiveBurgerMenu}
          loggedIn={loggedIn}
          page={page}
        />

        <Routes>
          {/* //? О проекте */}
          <Route path={paths.aboutProject} element={<Main />}></Route>

          {/* //? Фильмы */}
          <Route exact path={paths.movies} element={<Movies />}></Route>

          {/* //? Сохранённые фильмы */}
          <Route exact path={paths.savedMovies}></Route>

          {/* //? Аккаунт */}
          <Route exact path={paths.profile}></Route>

          {/* //? Авторизация */}
          <Route exact path={paths.login} element={<Login />}></Route>

          {/* //? Регистрация */}
          <Route exact path={paths.registration} element={<Register />}></Route>

          {/* // * не основные страницы */}

          {/* // ? PageNotFound */}
          <Route
            exact
            path={paths.pageNotFound}
            element={<PageNotFound />}
          ></Route>

          {/* // ? все остальные страницы */}
          <Route
            path={"*"}
            element={<Navigate to={paths.pageNotFound} replace />}
          ></Route>
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

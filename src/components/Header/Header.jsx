/* eslint-disable react-hooks/exhaustive-deps */

// * react
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ? стили
import './Header.css';

// ? компоненты
import Logo from './../Logo/Logo';
import Navigation from './../Navigation/Navigation';
import ButtonProfile from './../ButtonProfile/ButtonProfile';

// ? constants
import { paths, unActiveNavbarAndButtonRouters as routers } from './../../utils/Constants.js';

function Header({ loggedIn, page }) {

  const navigate = useNavigate();

  // * State`s

  // ? className
  const [className, setClassName] = useState('header');
  // ? отображение навигационной панели
  const [isNavigationActive, setIsNavigationActive] = useState(true);
  // ? отображение кнопки аккаунт/войти
  const [isButtonActive, setIsButtonActive] = useState(true);

  // добавление модификаторов в зависимости от пути и loggedIn
  useEffect(() => {
    if ((page === '/') && (loggedIn)) {
      setClassName('header header_place_landing header_user_login');
    } else if ((page === '/')) {
      setClassName('header header_place_landing');
    } else if ((loggedIn)) {
      setClassName('header header_user_login');
    }


  }, [page, loggedIn]);

  // отображение навигационной панели и кнопки аккаунт/войти
  useEffect(() => {
    if ((routers.includes(page))) {
      setIsNavigationActive(false);
      setIsButtonActive(false);
    } else {
      setIsNavigationActive(true);
      setIsButtonActive(true);
    }
  }, [page]);

  function toAboutProject() {
    navigate(paths.aboutProject);
  }

  return (
    <header className={className}>

      <Logo onClick={toAboutProject} />

      <Navigation loggedIn={loggedIn} page={page} />

      <ButtonProfile loggedIn={loggedIn} page={page} />

    </header>
  );
}

export default Header;

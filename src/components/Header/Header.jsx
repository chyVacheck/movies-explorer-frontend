/* eslint-disable react-hooks/exhaustive-deps */

// * react
import { useEffect, useState } from "react";

// ? стили
import './Header.css';

// ? компоненты
import Logo from './../Logo/Logo';
import Navigation from './../Navigation/Navigation';
import ButtonProfile from './../ButtonProfile/ButtonProfile';

// ? constants
import { activeHeaderRoutes as activ } from './../../utils/Constants.js';

function Header({ loggedIn, page }) {

  // * State`s

  // ? className
  const [className, setClassName] = useState('header');
  // ? отрисовка элемента 
  const [isActive, setIsActive] = useState(false);

  // добавление модификаторов в зависимости от пути и loggedIn
  useEffect(() => {
    if ((page === '/') && (loggedIn)) {
      setClassName('header header_place_landing header_user_login');
    } else if ((page === '/')) {
      setClassName('header header_place_landing');
    } else if ((loggedIn)) {
      setClassName('header header_user_login');
    } else {
      setClassName('header');
    }
  }, [page, loggedIn]);

  // Проверка на отрисовку элемента
  useEffect(() => {
    if (activ.includes(page)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [page]);


  return (
    isActive && <header className={className}>

      <Logo />

      <Navigation loggedIn={loggedIn} page={page} />

      <ButtonProfile loggedIn={loggedIn} page={page} />

    </header>
  );
}

export default Header;

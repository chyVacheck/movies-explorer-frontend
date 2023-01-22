/* eslint-disable react-hooks/exhaustive-deps */

// * react
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// ? стили
import './Navigation.css';

// ? constants
import {
  unActiveNavbarAndButtonRouters as disabledRouters,
  navigationRouters as allRoutes
} from './../../utils/Constants.js';

function Navigation({ loggedIn, page }) {

  // * State`s
  // ? отображение кнопки аккаунт/войти
  const [isActiveButton, setIsActive] = useState(false);

  // отображение навигационной панели и кнопки аккаунт/войти
  useEffect(() => {
    if ((disabledRouters.includes(page))) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [page]);

  return (
    isActiveButton ?
      <article className={'navigation'}>
        {loggedIn ?
          <ul className={'navigation__login-navlinks'}>
            {allRoutes.map((item, index) => {
              return (
                <li key={index}>
                  <NavLink
                    className={({ isActive }) => 'navigation__navlink link' + (isActive ? ' navigation__navlink_status_activ' : '')}
                    to={item.router}>
                    {item.context}
                  </NavLink>
                </li>
              )
            })}
          </ul>
          :
          <NavLink to='/signup' className={'navigation__navlink-registration link'} >Регистрация</NavLink>
        }

      </article >
      : ""
  );
}

export default Navigation;

/* eslint-disable react-hooks/exhaustive-deps */

// * react
import { NavLink } from "react-router-dom";

// ? стили
import './Navigation.css';

// ? constants
import {
  headerNavigationRouters as allRoutes
} from './../../utils/Constants.js';

function Navigation({ loggedIn, page }) {

  return (
    <article className={'navigation'}>
      {loggedIn ?
        <ul className={'navigation__login-navlinks'}>
          {allRoutes.map((item, index) => {
            return (
              <li key={index}>
                <NavLink
                  key={index}
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

    </article>
  );
}

export default Navigation;

// * react
import React, { NavLink } from 'react-router-dom';

// ? стили
import './Navigation.css';

// ? constants
import { headerNavigationRouters as allRoutes } from './../../utils/Constants';

function Navigation({ loggedIn, place, closeBurgerMenu }) {
  const className = `${
    loggedIn ? 'navigation navigation_loged_login' : 'navigation'
  }${place ? ` navigation_place_${place}` : ''}`;

  return (
    <article className={className}>
      {loggedIn ? (
        <ul className='navigation__navlinks'>
          {allRoutes.map((item, index) => {
            return (
              item.place.includes(place) && (
                <li
                  onClick={closeBurgerMenu}
                  key={index}
                  className='navigation__navlink-container'
                >
                  <NavLink
                    key={index}
                    className={({ isActive }) =>
                      'navigation__navlink link' +
                      (isActive ? ' navigation__navlink_status_activ' : '')
                    }
                    to={item.router}
                  >
                    {item.context}
                  </NavLink>
                </li>
              )
            );
          })}
        </ul>
      ) : (
        <NavLink to='/signup' className='navigation__navlink-registration link'>
          Регистрация
        </NavLink>
      )}
    </article>
  );
}

export default Navigation;

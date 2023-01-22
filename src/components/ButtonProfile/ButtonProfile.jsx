/* eslint-disable react-hooks/exhaustive-deps */

// * react
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// ? Context
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

// ? стили
import './ButtonProfile.css';

// ? constants
import { unActiveNavbarAndButtonRouters as routers, paths } from './../../utils/Constants.js';

// ? иконка пользователя
import userIcon from './../../images/UserIcon.svg';

function ButtonProfile({ loggedIn, page }) {

  const navigate = useNavigate();

  // * State`s
  // ? отображение кнопки аккаунт/войти
  const [isActive, setIsActive] = useState(false);

  //? Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // отображение навигационной панели и кнопки аккаунт/войти
  useEffect(() => {
    if ((routers.includes(page))) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [page]);

  // ? к стр авторизации
  function toLogin() {
    navigate(paths.login)
  }

  // ? к стр профиля
  function toProfile() {
    navigate(paths.profile)
  }

  return (
    isActive && <article className={'buttonProfile'}>
      {loggedIn ?

        <button
          className="buttonProfile__enter-profile button"
          onClick={toProfile}
        >
          <p className="buttonProfile__text">Аккаунт</p>
          <img className="buttonProfile__user-icon" src={userIcon} alt="profile" />
        </button>

        :

        <button
          className="buttonProfile__enter-login button"
          onClick={toLogin}
        >
          Войти
        </button>
      }
    </article>
  );
}

export default ButtonProfile;

/* eslint-disable react-hooks/exhaustive-deps */

// * react
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// ? Context
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// ? стили
import './ButtonProfile.css';

// ? constants
import { paths } from './../../utils/Constants.js';

// ? иконка пользователя
import userIcon from './../../images/UserIcon.svg';

function ButtonProfile({ place, loggedIn }) {
  const navigate = useNavigate();

  // * State`s

  //? Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // ? к стр авторизации
  function toLogin() {
    navigate(paths.login);
  }

  // ? к стр профиля
  function toProfile() {
    navigate(paths.profile);
  }

  // ? className
  const className = `button buttonProfile${
    loggedIn ? ' buttonProfile_loged_login' : ''
  } ${place ? ` buttonProfile_place_${place}` : ''}`;

  return (
    <article className={className}>
      {loggedIn ? (
        <button
          className="buttonProfile__enter-profile button"
          onClick={toProfile}
        >
          <p className="buttonProfile__text">Аккаунт</p>
          <img
            className="buttonProfile__user-icon"
            src={userIcon}
            alt="profile"
          />
        </button>
      ) : (
        <button className="buttonProfile__enter-login button" onClick={toLogin}>
          Войти
        </button>
      )}
    </article>
  );
}

export default ButtonProfile;

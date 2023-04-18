// * react
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ? стили
import './Profile.css';

// ? компоненты

// ? Context
import { CurrentUserContext } from './../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';

function Profile({
  onSubmit = () => console.log('Данные измененны'),
  setLoggedIn,
  setCurrentUser,
}) {
  // ? сontext
  const user = React.useContext(CurrentUserContext);

  // * State`s
  // ? пользовательские данные
  const [isActiveError, setIsActiveError] = useState(true);
  const [isActiveManagement, setIsActiveManagement] = useState(true);
  const [isButtonSaveDisabled, setIsButtonSaveDisabled] = useState(false);

  const navigate = useNavigate();

  function logOut() {
    mainApi
      .logOut()
      .then((ans) => {
        // очищаем профиль
        setCurrentUser({
          name: '',
          email: '',
        });
        // выходим из системы
        setLoggedIn(false);
        // переходим на главную страницу
        navigate('/');
      })
      .catch((err) =>
        console.log(`Запрос на сервер с целью выхода из системы выдал: ${err}`),
      );
  }

  return (
    <section className='profile'>
      {/* // ? Заглавие */}
      <h1 className='profile__title'>{`Привет, ${user.name}!`}</h1>
      {/* // ? форма */}
      <form onSubmit={onSubmit} className='profile__form'>
        <div className='profile__field'>
          <h2 className='profile__field-name'>Имя</h2>
          <input
            onChange={() => console.log()}
            value={user.name}
            className='profile__field-input'
          />
        </div>
        <div className='profile__field'>
          <h2 lang='en' className='profile__field-name'>
            E-mail
          </h2>
          <input
            onChange={() => console.log()}
            value={user.email}
            type='email'
            className='profile__field-input'
          />
        </div>
      </form>

      {/* // ? управление или ошибка и кнопка сохранить */}
      {isActiveManagement ? (
        <div className='profile__management'>
          <button
            onClick={() => setIsActiveManagement(!isActiveManagement)}
            type='button'
            className='button profile__management-button'
          >
            Редактировать
          </button>
          <button
            type='button'
            className='button profile__management-button profile__management-button_type_out'
            onClick={logOut}
          >
            Выйти из аккаунта
          </button>
        </div>
      ) : (
        <div className='profile__error-button-save'>
          <p className='profile__error'>
            {isActiveError && 'Это просто стилизованный пример ошибки'}
          </p>
          {/* // ? сохранить */}
          <button
            disabled={isButtonSaveDisabled}
            type='button'
            className={`button profile__button-save${
              isButtonSaveDisabled
                ? ' profile__button-save_enabled_disabled button_enabled_disabled'
                : ''
            }`}
            onClick={() => {
              console.log(
                'Пока что нажатие диактивирует кнопку, потом это будет поменяно на логику',
              );
              setIsButtonSaveDisabled(true);
            }}
          >
            Сохранить
          </button>
        </div>
      )}
    </section>
  );
}

export default Profile;

// * react
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ? стили
import './Profile.css';

// ? компоненты

// ? configs
import configSite from './../../config/configSite.json';

// ? Context
import { CurrentUserContext } from './../../contexts/CurrentUserContext';

// ? utils
// * constants
import { VALIDATION, status } from '../../utils/Constants';
// * utils
import { checkValidity, checkAnswerFromServer } from './../../utils/Utils';
// * Api
import mainApi from '../../utils/MainApi';

function Profile({ addNotification, setLoggedIn, setCurrentUser }) {
  const forNotification = {
    patch: 'Профиль',
    logOut: 'Выход из сети',
  };

  // ? сontext
  const user = React.useContext(CurrentUserContext);

  // * State`s
  // ? пользовательские данные
  const [isActiveManagement, setIsActiveManagement] = useState(true);

  // ? текст ошибки
  const [currentError, setCurrentError] = useState('');
  // ? текст кнопки submit
  const [currentTextSubmitButton, setCurrentTextSubmitButton] =
    useState('Сохранить');

  const navigate = useNavigate();

  // * валидация полей
  const [validatedFields, setValidatedFields] = useState({
    email: true,
    password: true,
  });

  // * валидация всей формы
  const [isFormValid, setIsFormValid] = useState(false);

  // * рефы под каждый инпут
  const nameRef = useRef();
  const emailRef = useRef();

  // дефолтные значения
  useEffect(() => {
    nameRef.current.value = user.name;
    emailRef.current.value = user.email;
  }, []);

  // смена значение в input
  function handleFieldChange(event) {
    const isValid = event.target.checkValidity();
    // смена значение валидации
    const validatedKeyPare = {
      [event.target.id]: isValid,
    };
    setValidatedFields({ ...validatedFields, ...validatedKeyPare });

    // смена текста ошибки
    setCurrentError(checkValidity(event.target.validity));

    // смена валидации формы
    if (
      nameRef.current.value === user.name &&
      emailRef.current.value === user.email
    ) {
      setIsFormValid(false);
    } else {
      setIsFormValid(event.target.closest('form').checkValidity());
    }
  }

  // выход из аккаунта
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
        // показываем пользователю уведомление
        addNotification({
          name: forNotification.logOut,
          type: 'successfully',
          text: 'Вы вышли из сети',
        });
      })
      .catch((err) => {
        addNotification({
          name: forNotification.logOut,
          type: 'error',
          text: 'Не удалось выйти из аккаунта',
        });
        if (configSite.status === status.dev)
          console.log(
            `Запрос на сервер с целью выхода из системы выдал: ${err}`,
          );
      });
  }

  function submit(event) {
    event.preventDefault();
    setCurrentTextSubmitButton('Сохраняем...');
    const user = {
      name: nameRef.current.value,
      email: emailRef.current.value,
    };
    // отправляем запрос на смену данных пользователя
    mainApi
      .setUserInfo(user)
      .then((res) => {
        if (configSite.status === status.dev)
          console.log(
            'Запрос на сервер с целью редактирования профиля вернул обьект:,',
            res,
          );
        setCurrentUser({
          name: res.data.name,
          email: res.data.email,
        });
        setIsActiveManagement(true);
        // показываем пользователю уведомление
        addNotification({
          name: forNotification.patch,
          type: 'successfully',
          text: 'Вы отредактировали профиль',
        });
      })
      .catch((err) => {
        if (configSite.status === status.dev)
          console.log(
            `Запрос на сервер с целью редактирования профиля выдал: ${err}`,
          );
        // устанавливаем ошибку
        if (err.status)
          setCurrentError(checkAnswerFromServer(err.status, 'register'));
        else setCurrentError(checkAnswerFromServer('all', 'failFetch'));
        setIsFormValid(false);
      })
      .finally(() => {
        setCurrentTextSubmitButton('Сохранить');
      });
  }

  return (
    <section className='profile'>
      {/* // ? Заглавие */}
      <h1 className='profile__title'>{`Привет, ${user.name}!`}</h1>
      {/* // ? форма */}
      <form onSubmit={submit} className='profile__form'>
        <div className='profile__fields'>
          <div className='profile__field'>
            <h2 className='profile__field-name'>Имя</h2>
            <input
              onChange={handleFieldChange}
              ref={nameRef}
              className='profile__field-input'
              readOnly={isActiveManagement}
              id='name'
              type='text'
              required
              minLength={VALIDATION.NAME.MIN}
              maxLength={VALIDATION.NAME.MAX}
            />
          </div>
          <div className='profile__field'>
            <h2 lang='en' className='profile__field-name'>
              E-mail
            </h2>
            <input
              onChange={handleFieldChange}
              ref={emailRef}
              id='email'
              type='email'
              required
              className='profile__field-input'
              readOnly={isActiveManagement}
              pattern={VALIDATION.EMAIL.pattern}
            />
          </div>
        </div>
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
            <p className='profile__error'>{currentError}</p>
            {/* // ? сохранить */}
            <button
              disabled={!isFormValid}
              type='submit'
              className={`button profile__button-save${
                isFormValid
                  ? ''
                  : ' profile__button-save_enabled_disabled button_enabled_disabled'
              }`}
              onClick={submit}
            >
              {currentTextSubmitButton}
            </button>
          </div>
        )}
      </form>
    </section>
  );
}

export default Profile;

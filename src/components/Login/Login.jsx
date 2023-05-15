// * react
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ? стили
import './Login.css';

// ? компоненты
import SignForm from './../SignForm/SignForm';

// ? utils
// * константы
import { paths, VALIDATION } from './../../utils/Constants';
// * utils
import { checkValidity, checkAnswerFromServer, checkPattern } from './../../utils/Utils';
// * Api
import mainApi from '../../utils/MainApi';

function Login({ addNotification, setCurrentUser, setLoggedIn }) {
  // ? текст ошибки
  const [currentError, setCurrentError] = useState('');
  // ? текст кнопки submit
  const [currentTextSubmitButton, setCurrentTextSubmitButton] =
    useState('Войти');

  const navigate = useNavigate();

  // * валидация полей
  const [validatedFields, setValidatedFields] = useState({
    email: true,
    password: true,
  });

  // * валидация всей формы
  const [isFormValid, setIsFormValid] = useState(false);

  // * рефы под каждый инпут
  const emailRef = useRef();
  const passwordRef = useRef();

  // смена значение в input
  function handleFieldChange(event) {
    const isValid = event.target.type === 'email' ? event.target.checkValidity() && checkPattern(event.target.value, VALIDATION.EMAIL.pattern) : event.target.checkValidity();

    // смена значение валидации
    const validatedKeyPare = {
      [event.target.id]: isValid,
    };
    setValidatedFields({ ...validatedFields, ...validatedKeyPare });
    // смена валидации формы
    setIsFormValid(event.target.closest('form').checkValidity() && isValid);
    // смена текста ошибки
    setCurrentError(checkValidity(event.target, event.target.type === 'email' && VALIDATION.EMAIL.pattern));
  }

  // авторизация
  function handleSubmit(event) {
    event.preventDefault();
    setCurrentTextSubmitButton('Входим...');
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    // отправляем запрос на авторизацию
    mainApi
      .authorization(user)
      .then(() => {
        // устанавливаем "вход" в систему
        setLoggedIn(true);
        // делаем запрос на данные о пользователе
        mainApi
          .getUserInfo()
          .then((res) => {
            // устанавливаем данные
            setCurrentUser({
              name: res.data.name,
              email: res.data.email,
            });
            addNotification({
              name: 'Авторизация',
              type: 'successfully',
              text: 'Вы успешно авторизовались',
            });
            navigate(paths.movies);
          })
          .catch((err) => {
            // устанавливаем ошибку
            setCurrentError(checkAnswerFromServer(err.status, 'login'));
            setIsFormValid(false);
          });
      })
      .catch((err) => {
        // устанавливаем ошибку
        if (err.status)
          setCurrentError(checkAnswerFromServer(err.status, 'login'));
        else setCurrentError(checkAnswerFromServer('all', 'failFetch'));
        setIsFormValid(false);
      })
      .finally(() => {
        setCurrentTextSubmitButton('Войти');
      });
  }

  return (
    <section className='login'>
      <SignForm
        title='Рады видеть!'
        submitButton={{
          text: currentTextSubmitButton,
        }}
        onSubmit={handleSubmit}
        onChange={handleFieldChange}
        error={currentError}
        textUnderSubmit='Ещё не зарегистрированы?'
        isValid={isFormValid}
        link={{
          text: 'Регистрация',
          to: paths.registration,
        }}
        inputs={[
          {
            name: 'E-mail',
            lang: 'en',
            placeholder: 'pochta@yandex.ru',
            type: 'email',
            id: 'email',
            required: true,
            ref: emailRef,
            isValid: validatedFields.email,
          },
          {
            name: 'Пароль',
            placeholder: 'qwerty123',
            type: 'password',
            id: 'password',
            minLength: VALIDATION.PASSWORD.MIN,
            maxLength: VALIDATION.PASSWORD.MAX,
            required: true,
            ref: passwordRef,
            isValid: validatedFields.password,
          },
        ]}
      />
    </section>
  );
}

export default Login;

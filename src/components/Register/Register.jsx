// * react
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ? стили
import './Register.css';

// ? компоненты
import SignForm from './../SignForm/SignForm';

// ? utils
// * константы
import { paths, VALIDATION } from './../../utils/Constants';
// * utils
import { checkValidity, checkAnswerFromServer, chekPattern } from './../../utils/Utils';
// * Api
import mainApi from '../../utils/MainApi';

function Register({ addNotification, setCurrentUser, setLoggedIn }) {
  // ? текст ошибки
  const [currentError, setCurrentError] = useState('');
  // ? текст кнопки submit
  const [currentTextSubmitButton, setCurrentTextSubmitButton] =
    useState('Зарегистрироваться');

  const navigate = useNavigate();

  // * валидация полей
  const [validatedFields, setValidatedFields] = useState({
    name: true,
    email: true,
    password: true,
  });

  // * валидация всей формы
  const [isFormValid, setIsFormValid] = useState(false);

  // * рефы под каждый инпут
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  // смена значение в input
  function handleFieldChange(event) {
    const isValid = event.target.checkValidity() && chekPattern(event.target.value, VALIDATION.EMAIL.pattern);
    
    // смена значение валидации
    const validatedKeyPare = {
      [event.target.id]: isValid,
    };
    setValidatedFields({ ...validatedFields, ...validatedKeyPare });
    // смена валидации формы
    setIsFormValid(event.target.closest('form').checkValidity());
    // смена текста ошибки
    setCurrentError(checkValidity(event.target, VALIDATION.EMAIL.pattern));
  }

  // регистрация
  function handleSubmit(event) {
    event.preventDefault();
    setCurrentTextSubmitButton('Регистрируем...');
    const user = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    // отправляем запрос на регистрацию
    mainApi
      .registration(user)
      .then((res) => {
        // отправляем запрос на авторизацию
        mainApi
          .authorization({
            email: user.email,
            password: user.password,
          })
          .then(() => {
            // устанавливаем значения
            setCurrentUser({
              name: res.data.name,
              email: res.data.email,
            });
            addNotification({
              name: 'Регистрация',
              type: 'successfully',
              text: 'Вы успешно зарегистрировались',
            });
            // устанавливаем "вход" в систему
            setLoggedIn(true);
            navigate(paths.movies);
          });
      })
      .catch((err) => {
        // устанавливаем ошибку
        if (err.status)
          setCurrentError(checkAnswerFromServer(err.status, 'register'));
        else setCurrentError(checkAnswerFromServer('all', 'failFetch'));
        setIsFormValid(false);
      })
      .finally(() => {
        setCurrentTextSubmitButton('Зарегистрироваться');
      });
  }

  return (
    <section className='register'>
      <SignForm
        title='Добро пожаловать!'
        submitButton={{
          text: currentTextSubmitButton,
        }}
        onSubmit={handleSubmit}
        onChange={handleFieldChange}
        error={currentError}
        textUnderSubmit='Уже зарегистрированы?'
        isValid={isFormValid}
        link={{
          text: 'Войти',
          to: paths.login,
        }}
        inputs={[
          {
            name: 'Имя',
            placeholder: 'Сергей Басов',
            type: 'text',
            id: 'name',
            minLength: VALIDATION.NAME.MIN,
            maxLength: VALIDATION.NAME.MAX,
            required: true,
            ref: nameRef,
            isValid: validatedFields.name,
          },
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

export default Register;

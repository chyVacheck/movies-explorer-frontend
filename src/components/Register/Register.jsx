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
import {
  checkValidity,
  checkAnswerFromServer,
  checkPattern,
} from './../../utils/Utils';
// * Api
import mainApi from '../../utils/MainApi';

function Register({ addNotification, setCurrentUser, setLoggedIn }) {
  // ? текст ошибки
  const [currentError, setCurrentError] = useState('');
  // ? текст кнопки submit
  const [currentTextSubmitButton, setCurrentTextSubmitButton] =
    useState('Register');

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
    const isValid =
      event.target.type === 'email'
        ? event.target.checkValidity() &&
          checkPattern(event.target.value, VALIDATION.EMAIL.pattern)
        : event.target.checkValidity();

    // смена значение валидации
    const validatedKeyPare = {
      [event.target.id]: isValid,
    };
    setValidatedFields({ ...validatedFields, ...validatedKeyPare });
    // смена валидации формы
    setIsFormValid(event.target.closest('form').checkValidity() && isValid);
    // смена текста ошибки
    setCurrentError(
      checkValidity(
        event.target,
        event.target.type === 'email' && VALIDATION.EMAIL.pattern,
      ),
    );
  }

  // регистрация
  function handleSubmit(event) {
    event.preventDefault();
    setCurrentTextSubmitButton('Registering...');
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
              name: 'Registration',
              type: 'successfully',
              text: 'You have successfully registered',
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
        setCurrentTextSubmitButton('Register');
      });
  }

  return (
    <section className='register'>
      <SignForm
        title='Welcome !'
        submitButton={{
          text: currentTextSubmitButton,
        }}
        onSubmit={handleSubmit}
        onChange={handleFieldChange}
        error={currentError}
        textUnderSubmit='Already register?'
        isValid={isFormValid}
        link={{
          text: 'Login',
          to: paths.login,
        }}
        inputs={[
          {
            name: 'Name',
            placeholder: 'Dmytro',
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
            placeholder: 'mail@gmail.com',
            type: 'email',
            id: 'email',
            required: true,
            ref: emailRef,
            isValid: validatedFields.email,
          },
          {
            name: 'Password',
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

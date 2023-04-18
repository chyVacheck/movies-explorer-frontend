// * react
import React, { useState, useRef } from 'react';

// ? стили
import './Login.css';

// ? компоненты
import SignForm from './../SignForm/SignForm';
// ? константы
import { paths, VALIDATION } from './../../utils/Constants';
// ? utils
import { checkValidity } from './../../utils/Utils';

function Login() {
  // * текст ошибки
  const [currentError, setCurrentError] = useState('');

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
    const isValid = event.target.checkValidity();
    // смена значение валидации
    const validatedKeyPare = {
      [event.target.id]: isValid,
    };
    setValidatedFields({ ...validatedFields, ...validatedKeyPare });
    // смена валидации формы
    setIsFormValid(event.target.closest('form').checkValidity());
    // смена текста ошибки
    setCurrentError(checkValidity(event.target.validity));
  }

  // авторизация
  function handleSubmit(event) {
    event.preventDefault();
    // todo убрать потом
    console.log('Отправка запроса на сервер');
  }

  return (
    <section className='login'>
      <SignForm
        title='Рады видеть!'
        submitButton={{
          text: 'Войти',
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
            pattern: VALIDATION.EMAIL.pattern,
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

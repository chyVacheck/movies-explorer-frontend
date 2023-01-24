/* eslint-disable react-hooks/exhaustive-deps */

// * react

// ? стили
import './Register.css';

// ? компоненты
import SignForm from './../SignForm/SignForm';
// ? константы
import { paths } from './../../utils/Constants';

function Register() {


  return (
    <section className={'register'}>

      <SignForm
        title='Добро пожаловать!'
        submitButton={
          {
            text: 'Зарегистрироваться'
          }
        }
        inputs={[
          {
            name: 'Имя',
            placeholder: 'Дмитрий',
            value: '',
            type: 'text',
          },
          {
            name: 'E-mail',
            lang: 'en',
            placeholder: 'pochta@yandex.ru',
            value: '',
            type: 'email',
          },
          {
            name: 'Пароль',
            placeholder: 'qwerty123',
            value: '',
            type: 'password',
          },
        ]}
        error={'Что-то пошло не так...'}
        textUnderSubmit={'Уже зарегистрированы?'}
        link={
          {
            text: 'Войти',
            to: paths.login,
          }
        }
      />

    </section>
  );
}

export default Register;

// * react

// ? стили
import './Login.css';

// ? компоненты
import SignForm from './../SignForm/SignForm';
// ? константы
import { paths } from './../../utils/Constants';

function Login() {
  return (
    <section className={'login'}>
      <SignForm
        title="Рады видеть!"
        submitButton={{
          text: 'Войти',
        }}
        inputs={[
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
        textUnderSubmit={'Ещё не зарегистрированы?'}
        link={{
          text: 'Регистрация',
          to: paths.registration,
        }}
      />
    </section>
  );
}

export default Login;

// * react
import React from 'react';

// ? стили
import './Profile.css';

// ? компоненты

// ? Context
import { CurrentUserContext } from './../../contexts/CurrentUserContext';

function Profile({ onSubmit = () => console.log('Данные измененны') }) {
  const user = React.useContext(CurrentUserContext);

  return (
    <section className='profile'>
      {/* // ? Заглавие */}
      <h1 className='profile__title'>{`Привет, ${user.name}!`}</h1>
      {/* // ? форма */}
      <form onSubmit={onSubmit} className='profile__form'>
        <div className='profile__field'>
          <h2 className='profile__field-name'>Имя</h2>
          <input value={user.name} className='profile__field-input' />
        </div>
        <div className='profile__field'>
          <h2 lang='en' className='profile__field-name'>
            E-mail
          </h2>
          <input
            value={user.email}
            type='email'
            className='profile__field-input'
          />
        </div>
      </form>
      {/* // ? управление */}
      <div className='profile__management'>
        <button type='button' className='button profile__management-button'>
          Редактировать
        </button>
        <button
          type='button'
          className='button profile__management-button profile__management-button_type_out'
        >
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
}

export default Profile;

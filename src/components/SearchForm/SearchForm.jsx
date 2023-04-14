// * react
import React, { useEffect, useState } from 'react';

// ? стили
import './SearchForm.css';

// ? компоненты

// ? images
import icon from '../../images/searchIcon.svg';

function SearchForm() {
  // * State`s
  // ? пользователь данные
  const [isActiveShortFilm, setIsActiveShortFilm] = useState(false);

  useEffect(() => {
    if (['true', 'false'].includes(localStorage.getItem('shortFilm'))) {
      setIsActiveShortFilm(JSON.parse(localStorage.getItem('shortFilm')));
    }
  }, []);

  function toogleShortFilm() {
    setIsActiveShortFilm(!isActiveShortFilm);
    localStorage.setItem('shortFilm', !isActiveShortFilm);
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log('Поиск фильмов');
  }

  return (
    <article className='SearchForm'>
      <div className='SearchForm__container'>
        <form onSubmit={onSubmit} className='SearchForm__field-input'>
          <img src={icon} alt='search' />
          <input
            required
            type='text'
            placeholder='Фильм'
            className='SearchForm__input'
          />
          <div className='SearchForm__settings-and-button-search'>
            <button
              aria-label='search'
              type='submit'
              className='button SearchForm__button-search'
            >
              Найти
            </button>
            <div className='SearchForm__settings SearchForm__settings_place_field'>
              <button
                aria-label='short films'
                type='button'
                onClick={toogleShortFilm}
                className={`button SearchForm__button-short-film ${
                  isActiveShortFilm
                    ? 'SearchForm__button-short-film_active_active'
                    : ''
                }`}
              />
              <p className='SearchForm__text'>Короткометражки</p>
            </div>
          </div>
        </form>
        <div className='SearchForm__settings SearchForm__settings_place_container'>
          <button
            aria-label='short films'
            type='button'
            onClick={toogleShortFilm}
            className={`button SearchForm__button-short-film ${
              isActiveShortFilm
                ? 'SearchForm__button-short-film_active_active'
                : ''
            }`}
          />
          <p className='SearchForm__text'>Короткометражки</p>
        </div>
      </div>
    </article>
  );
}

export default SearchForm;

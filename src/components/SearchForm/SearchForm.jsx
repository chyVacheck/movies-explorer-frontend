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

  return (
    <article className='SearchForm'>
      <div className='SearchForm__container'>
        <div className='SearchForm__field-input'>
          <img src={icon} alt='search' />
          <input
            type='text'
            placeholder='Фильм'
            className='SearchForm__input'
          />
          <div className='SearchForm__settings-and-button-search'>
            <button
              aria-label='search'
              type='submit'
              onClick={() => console.log(123)}
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
        </div>
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

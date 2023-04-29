// * react
import React from 'react';

// ? стили
import './SearchForm.css';

// ? компоненты

// ? images
import icon from '../../images/searchIcon.svg';

function SearchForm({ shortFilm, onSubmit, input }) {
  return (
    <article className='SearchForm'>
      <div className='SearchForm__container'>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit(shortFilm.isActive);
          }}
          className='SearchForm__field-input'
        >
          <img src={icon} alt='search' />
          <input
            required
            type='text'
            placeholder='Фильм'
            className='SearchForm__input'
            id={input.id}
            ref={input.ref}
            readOnly={input.readOnly}
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
                onClick={shortFilm.toogle}
                className={`button SearchForm__button-short-film ${
                  shortFilm.isActive
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
            onClick={shortFilm.toogle}
            className={`button SearchForm__button-short-film ${
              shortFilm.isActive
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

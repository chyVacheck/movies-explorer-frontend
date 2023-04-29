// * react
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// ? стили
import './MoviesCard.css';

// ? компоненты

// ? image
import defaultPhoto from './../../images/default_movie-card.png';

// ? configs
import configApi from './../../config/configApi.json';
import configSite from './../../config/configSite.json';

// ? utils
// * constants
import { status } from './../../utils/Constants';
// * utils
import { declOfNum } from './../../utils/Utils';
// * Api
import mainApi from './../../utils/MainApi';

function MoviesCard({ setMovies, lang, movie, place = 'movies' }) {
  // * State`s
  const [isAdded, setAdded] = useState(!(movie._id === null));

  const classNameForButton = `MoviesCard__button button${
    place === 'movies'
      ? isAdded
        ? ' MoviesCard__button_added_added'
        : ''
      : ' MoviesCard__button_place_saved-movies'
  }`;

  const ariaLabel = `${
    place === 'movies'
      ? 'добавить'
      : movie._id === 'null'
      ? 'добавить'
      : 'удалить'
  } фильм`;

  // * function`s
  // сохранить фильм
  function save(movie) {
    // отправляем запрос на сохранение фильма
    mainApi
      .saveMovie(movie)
      .then((res) => {
        if (res) {
          movie._id = res.data._id;
          setAdded(true);
        }
      })
      .catch((err) => {
        // ! dev
        if (configSite.status === status.dev)
          console.log(
            `Запрос на сервер с целью сохранения фильма выдал: [${err.message}]`,
          );
      });
  }

  // удаляет фильм
  function deleteMovie(movie) {
    // отправляем запрос на сохранение фильма
    mainApi
      .deleteMovie(movie._id)
      .then((res) => {
        if (res) {
          setAdded(false);

          if (place === 'saved-movies') {
            // фильтруем фильмы
            setMovies((movies) =>
              movies.filter((c) => (c._id === movie._id ? false : true)),
            );
          }

          movie._id = null;
        }
      })
      .catch((err) => {
        // ! dev
        if (configSite.status === 'dev')
          console.log(
            `Запрос на сервер с целью удаления фильма выдал: [${err.message}]`,
          );
      });
  }

  // действие на кнопке
  function action() {
    if (place === 'saved-movies') {
      deleteMovie(movie);
    } else {
      if (isAdded) deleteMovie(movie);
      else save(movie);
    }
  }

  return (
    <article className='MoviesCard'>
      {/* // * заглавие */}
      <div className='MoviesCard__header'>
        <h2 lang={lang} className='MoviesCard__name'>
          {movie.nameRU}
        </h2>
        <p className='MoviesCard__duration'>{`${movie.duration} ${declOfNum(
          movie.duration,
        )}`}</p>
      </div>
      {/* // * фото */}
      <Link to={movie.trailerLink} target='_blank' rel='noreferrer noopener'>
        <img className='MoviesCard__img' src={movie.image} alt={movie.nameRU} />
      </Link>

      {/* // * кнопка сохранить */}
      <button
        className={classNameForButton}
        type='button'
        aria-label={ariaLabel}
        onClick={action}
      >
        {place === 'movies' && (
          <p className='MoviesCard__button-text'>Сохранить</p>
        )}
      </button>
    </article>
  );
}

export default MoviesCard;

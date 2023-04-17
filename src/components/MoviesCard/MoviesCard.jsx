// * react
import React from 'react';

// ? стили
import './MoviesCard.css';

// ? компоненты

// ? image
import defaultPhoto from './../../images/default_movie-card.png';

function MoviesCard({
  lang = 'ru',
  title = 'В погоне за Бенкси',
  img = { src: defaultPhoto, alt: 'В погоне за Бенкси' },
  time = null,
  added = false,
  place = 'movies',
}) {
  const classNameForButton = `MoviesCard__button button${
    place === 'movies'
      ? added
        ? ' MoviesCard__button_added_added'
        : ''
      : ' MoviesCard__button_place_saved-movies'
  }`;

  const ariaLabel = `${place === 'movies' ? 'добавить' : 'удалить'} фильм`;

  return (
    <article className='MoviesCard'>
      <div className='MoviesCard__header'>
        <h2 lang={lang} className='MoviesCard__title'>
          {title}
        </h2>
        <p className='MoviesCard__time'>{`${time} минут`}</p>
      </div>
      <img className='MoviesCard__img' src={img.src} alt={img.alt} />
      <button
        className={classNameForButton}
        type='button'
        aria-label={ariaLabel}
        onClick={() => console.log('добавить фильм')}
      >
        {place === 'movies' && (
          <p className='MoviesCard__button-text '>Сохранить</p>
        )}
      </button>
    </article>
  );
}

export default MoviesCard;

// * react
import React from 'react';

// ? стили
import './MoviesCardList.css';

// ? компоненты
import MoviesCard from '../MoviesCard/MoviesCard';

// ? компоненты

function MoviesCardList({ isPressedSubmit, setMovies, cardList, place }) {
  return (
    <article className='MoviesCardList'>
      {cardList.length > 0 ? (
        cardList.map((item, index) => (
          <MoviesCard
            key={index}
            lang={
              item.nameRU && item.nameEN
                ? item.nameRU.toLowerCase() === item.nameEN.toLowerCase()
                  ? 'en'
                  : 'ru'
                : 'ru'
            }
            setMovies={setMovies}
            movie={item}
            place={place}
          />
        ))
      ) : (
        <p className='MoviesCardList__not-found'>
          {isPressedSubmit
            ? 'К сожалению по вашему запросу ничего не нашлось'
            : 'Введите название фильма и нажмите кнопку "Найти"'}
        </p>
      )}
    </article>
  );
}

export default MoviesCardList;

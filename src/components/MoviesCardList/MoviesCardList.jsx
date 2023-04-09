// * react
import React from 'react';
// ? стили
import './MoviesCardList.css';

// ? компоненты
import MoviesCard from '../MoviesCard/MoviesCard';

// ? компоненты

function MoviesCardList({ cardList = [], place, shortFilm }) {
  return (
    <article className='MoviesCardList'>
      {cardList.map((item, index) => (
        <MoviesCard
          key={index}
          lang={item.lang}
          title={item.title}
          img={item.img}
          time={item.time}
          added={item.added}
          place={place}
        />
      ))}
    </article>
  );
}

export default MoviesCardList;

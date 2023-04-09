// * react
import React from 'react';
// ? стили
import './Movies.css';

// ? компоненты
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../MoreButton/MoreButton';

// ? image
import defaultPhoto from './../../images/default_movie-card.png';

// ? constants

function Movies() {
  function moreCards() {
    console.log('+1 фильм');
  }

  return (
    <section className='Movies'>
      <SearchForm />
      <MoviesCardList
        cardList={[
          {
            title: 'В погоне за Бенкси',
            time: 19,
            added: true,
            img: {
              src: defaultPhoto,
              alt: 'Просто фото',
            },
          },
          {
            title: 'В погоне за Бенкси',
            time: 27,
          },
          {
            title: 'В погоне за Бенкси',
            time: 450,
            added: true,
          },
          {
            title: 'В погоне за Бенкси',
            time: 40,
          },
          {
            title: 'В погоне за Бенкси',
            time: 1999,
            added: true,
          },
        ]}
        place='movies'
      />
      <MoreButton onClick={moreCards} />
    </section>
  );
}

export default Movies;

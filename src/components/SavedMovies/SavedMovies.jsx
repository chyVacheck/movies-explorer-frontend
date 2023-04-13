// * react
import React from 'react';

// ? стили
import './SavedMovies.css';

// ? компоненты
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

// ? constants

function SavedMovies() {
  return (
    <section className='SavedMovies'>
      <SearchForm />
      <MoviesCardList
        cardList={[
          {
            title: 'В погоне за Бенкси',
            time: 19,
            added: true,
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
        place='saved-movies'
      />
    </section>
  );
}

export default SavedMovies;

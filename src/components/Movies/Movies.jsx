// * react
import React, { useState, useRef, useEffect } from 'react';

// ? стили
import './Movies.css';

// ? компоненты
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../MoreButton/MoreButton';
import Preloader from '../Preloader/Preloader';

// ? image
import defaultPhoto from './../../images/default_movie-card.png';

// ? configs
import configSite from './../../config/configSite.json';
import configApi from './../../config/configApi.json';

// ? utils
// * constants
import {
  status,
  localStorageNames,
  SHORT_MOVIE_DURATION,
  NUMBER_OF_MOVIES_TO_RENDER as NUMBER_RENDER,
} from './../../utils/Constants';
// * utils
import { checkAnswerFromServer } from './../../utils/Utils';
// * Api
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

function Movies({ addNotification }) {
  const place = 'movies';
  // именя переменных в локальном хранилище
  const shortFilmName = localStorageNames.shortFilm[place];
  const searchWordName = localStorageNames.searchWordName[place];

  // * State`s
  // ? пользователь данные
  const [isActiveShortFilm, setIsActiveShortFilm] = useState(false);
  // ? состояние прелоадера
  const [isPreloaderActive, setIsPreloaderActive] = useState(false);
  // ? вкл выкл инпут
  const [isInputReadOnly, setInputReadOnly] = useState(false);
  // все фильмы
  const [allMovies, setAllMovies] = useState([]);
  // сохраненные фильмы
  const [savedMovies, setSavedMovies] = useState([]);
  // отфильтрованные фильмы
  const [filteredMovies, setFilteredMovieds] = useState([]);
  // отрисованные фильмы
  const [renderMovies, setRenderMovies] = useState([]);
  // ? отправлен ли запрос на сервер
  const [isRequestProcessed, setRequestProcessed] = useState(true);
  // получили ли сохраненные фильмы
  const [isRequestSavedMovies, setRequestSavedMovies] = useState(false);
  // поисковое слово
  const [searchWord, setSearchWord] = useState(null);
  // нажат ли кнопка поиска
  const [isPressedSubmit, setPressedSubmit] = useState(false);
  // сколько карточек отрисовывать
  const [numberOfMovies, setNumberOfMovies] = useState({});
  // нажат ли кнопка поиска
  const [isMoreButtonAcctive, setMoreButtonAcctive] = useState(true);

  // * useRef`s
  const searchRef = useRef();

  // * useEffect`s
  // достаем фильтр короткометражек из // ? localstorage
  useEffect(() => {
    if (['true', 'false'].includes(localStorage.getItem(shortFilmName))) {
      setIsActiveShortFilm(JSON.parse(localStorage.getItem(shortFilmName)));
    }
  }, []);

  // достаем поисковое слово из // ? localstorage
  useEffect(() => {
    // достаем из localstorage
    const _searchWord = localStorage.getItem(searchWordName) || null;

    // если не пустая
    if (_searchWord !== null) {
      // устанавливаем в нижнем регистре
      setSearchWord(_searchWord.toLowerCase());

      // устанавливаем в поисковую строку в том виде как было
      searchRef.current.value = _searchWord;
    }
  }, []);

  // в зависимости от ширины экрана устанавливаем количество карточек к отрисовке
  useEffect(() => {
    handlerResize();
  }, []);

  // фильтруем карточки
  useEffect(() => {
    if (!isRequestProcessed) {
      setPressedSubmit(true);
      setIsPreloaderActive(true);
      setInputReadOnly(true);
      // устанавливаем фильтрованные фильмы
      filteredAndSetMovies(
        isActiveShortFilm,
        searchWord !== null ? searchWord.toLowerCase() : '',
      );
    }
  }, [isRequestProcessed]);

  // устанавливаем карточки
  useEffect(() => {
    const array = [];
    let length = 0;
    if (numberOfMovies.start > filteredMovies.length) {
      length = filteredMovies.length;
      setMoreButtonAcctive(false);
    } else {
      length = numberOfMovies.start;
      setMoreButtonAcctive(true);
    }

    for (let i = 0; i < length; i++) {
      array[i] = filteredMovies[i];
    }

    setRenderMovies(array);
    setIsPreloaderActive(false);
    setInputReadOnly(false);
  }, [filteredMovies]);

  // запрос на сохраненные фильмы
  useEffect(() => {
    mainApi
      .getMovies()
      .then((result) => {
        if (result) {
          setSavedMovies(result);
          setRequestSavedMovies(true);
          // ! dev
          if (configSite.status === status.dev)
            console.log(
              'Запрос на сервер с целью получить сохраненные фильмы вернул',
              result,
            );
        }
      })
      .catch((error) => {
        // ! dev
        if (configSite.status === status.dev)
          console.log(
            `Запрос на сервер с целью получить сохраненные фильмы выдал: [${error.message}]`,
          );

        // показываем уведомление об ошибке
        if (!error.status)
          addNotification({
            name: '500',
            type: 'error',
            text: checkAnswerFromServer('all', 'failFetch'),
          });
      });
  }, []);

  // получаем и устанавливаем фильмы
  useEffect(() => {
    // запрос на все фильмы
    const fetch = async () => {
      return await moviesApi
        .getMovies()
        .then((res) => {
          if (res) {
            const array = [];
            // редактируем пришедшие данные
            res.forEach((movie, index) => {
              // копируем значение
              array[index] = movie;

              // добавляем thumbnail
              array[
                index
              ].thumbnail = `${configApi.Movies.ImageUrl}${movie.image.formats.thumbnail.url}`;

              // меняем image
              array[
                index
              ].image = `${configApi.Movies.ImageUrl}${movie.image.url}`;

              // movieId
              array[index].movieId = movie.id;

              array[index]._id = null;

              // добавляем _id
              savedMovies.length > 0
                ? savedMovies.forEach((savedMovie) => {
                    // сравниваем movieId
                    if (savedMovie.movieId === array[index].movieId) {
                      // если одинаковые, то устанавливаем _id
                      array[index]._id = savedMovie._id;
                    }
                  })
                : (array[index]._id = null);
            });

            // записываем их
            setAllMovies(array);

            // ! dev
            if (configSite.status === status.dev)
              console.log(
                'Запрос на сервер с целью получить все фильмы вернул',
                res,
              );
          }
        })
        .catch((err) => {
          // ! dev
          if (configSite.status === status.dev)
            console.log(
              `Запрос на сервер с целью получить все фильмы выдал: [${err.message}]`,
            );

          // показываем уведомление об ошибке
          if (!err.status)
            addNotification({
              name: '500',
              type: 'error',
              text: checkAnswerFromServer('all', 'failFetch'),
            });
        })
        .finally(() => {
          setRequestProcessed(false);
        });
    };

    if (isRequestSavedMovies) fetch();
  }, [isRequestSavedMovies]);

  // * function`s
  function moreCards() {
    setIsPreloaderActive(true);

    const start = renderMovies.length;
    let end = start + numberOfMovies.more;

    if (end >= filteredMovies.length) {
      end = filteredMovies.length;
      setMoreButtonAcctive(false);
    }

    const array = [];
    for (let i = 0; i < end - start; i++) {
      array[i] = filteredMovies[start + i];
    }

    setRenderMovies([...renderMovies, ...array]);
    setIsPreloaderActive(false);
  }

  // возвращает короткометражные фильмы
  function _shortMovies(movie) {
    // фильтр по длительности
    return movie.duration <= SHORT_MOVIE_DURATION;
  }

  // возвращает фильмы подходящие по поиску
  function _searchMovies(movie, _searchWord) {
    return (
      // фильтр по имени (русс)
      movie.nameRU.toLowerCase().includes(_searchWord) ||
      // фильтр по имени (англ)
      movie.nameEN.toLowerCase().includes(_searchWord)
    );
  }

  // переключаем значение фильтра
  function toogleShortFilm() {
    // устанавливаем в localStorage новое значение
    localStorage.setItem(shortFilmName, !isActiveShortFilm);

    // фильтруем только если была нажата кнопка поиска
    isPressedSubmit &&
      (!isActiveShortFilm
        ? // устанавливаем фильтрованные фильмы
          setFilteredMovieds(filteredMovies.filter(_shortMovies))
        : setFilteredMovieds(
            allMovies.filter((movie) => _searchMovies(movie, searchWord)),
          ));

    setIsActiveShortFilm(!isActiveShortFilm);

    // ! dev
    if (configSite.status === status.dev)
      console.log(`Состояние короткометражек сейчас: [${!isActiveShortFilm}]`);
  }

  // фильтр фильмов
  function handleSearchMovies(isActive) {
    const _searchWord = searchRef.current.value;

    // если поиск новый, то начинаем отрисовку
    if (!isPressedSubmit || _searchWord.toLowerCase() !== searchWord) {
      setSearchWord(_searchWord.toLowerCase());
      // устанавливаем в localStorage новое значение
      localStorage.setItem(searchWordName, _searchWord);

      setPressedSubmit(true);
      setIsPreloaderActive(true);
      setInputReadOnly(true);
      // устанавливаем фильтрованные фильмы
      filteredAndSetMovies(isActive, _searchWord.toLowerCase());

      // ! dev
      if (configSite.status === status.dev)
        console.log(
          `Поисковое слово сохраненно в localStorage: [${_searchWord}]`,
        );
    }
  }

  // фильтруем и устанавливаем фильмы
  function filteredAndSetMovies(isActive, _searchWord) {
    // устанавливаем фильтрованные фильмы
    setFilteredMovieds(
      allMovies
        .filter((movie) => _searchMovies(movie, _searchWord))
        .filter(isActive ? _shortMovies : () => true),
    );
  }

  // в зависимости от ширины экрана устанавливаем количество карточек к отрисовке
  function handlerResize() {
    const _width = window.innerWidth;

    let _numbOfMovies = {};

    if (_width >= NUMBER_RENDER.LAPTOP.widthEnd) {
      _numbOfMovies = NUMBER_RENDER.LAPTOP;
    } else if (
      NUMBER_RENDER.TABLET.widthStart > _width &&
      _width >= NUMBER_RENDER.TABLET.widthEnd
    ) {
      _numbOfMovies = NUMBER_RENDER.TABLET;
    } else if (NUMBER_RENDER.PHONE.widthStart > _width) {
      _numbOfMovies = NUMBER_RENDER.PHONE;
    }

    setNumberOfMovies({
      start: _numbOfMovies.start,
      more: _numbOfMovies.more,
    });
  }

  // вешаем слушатель
  window.addEventListener('resize', handlerResize);

  // * return
  return (
    <section className='Movies'>
      <SearchForm
        shortFilm={{
          isActive: isActiveShortFilm,
          toogle: toogleShortFilm,
        }}
        onSubmit={handleSearchMovies}
        input={{
          id: 'search',
          ref: searchRef,
          readOnly: isInputReadOnly,
        }}
      />

      <MoviesCardList
        isPreloaderActive={isPreloaderActive}
        cardList={!isRequestProcessed && renderMovies}
        place='movies'
      />

      {isPreloaderActive ? (
        <Preloader />
      ) : (
        isMoreButtonAcctive && <MoreButton onClick={moreCards} />
      )}
    </section>
  );
}

export default Movies;

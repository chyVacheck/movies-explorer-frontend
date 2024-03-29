// * react
import React, { useState, useRef, useEffect } from 'react';

// ? стили
import './SavedMovies.css';

// ? компоненты
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

// ? configs
import configSite from './../../config/configSite.json';
import configApi from './../../config/configApi.json';

// ? utils
// * constants
import {
  status,
  localStorageNames,
  SHORT_MOVIE_DURATION,
} from './../../utils/Constants';
// * utils

// * Api
import mainApi from '../../utils/MainApi';

function SavedMovies() {
  const place = 'saved-movies';
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
  // ? сохраненные фильмы
  const [savedMovies, setSavedMovies] = useState([]);
  // ? отфильтрованные фильмы
  const [filteredMovies, setFilteredMovies] = useState([]);
  // отправлен ли запрос на сервер
  const [isRequestProcessed, setRequestProcessed] = useState(true);
  // поисковое слово
  const [searchWord, setSearchWord] = useState(null);

  // * useRef`s
  const searchRef = useRef();

  // * useEffect`s
  // фильтр короткометражек
  useEffect(() => {
    if (['true', 'false'].includes(localStorage.getItem(shortFilmName))) {
      setIsActiveShortFilm(JSON.parse(localStorage.getItem(shortFilmName)));
    }
  }, []);

  // запрос на получение сохраненных фильмов
  useEffect(() => {
    const fetch = async () =>
      await mainApi
        .getMovies()
        .then((res) => {
          if (res) {
            setSavedMovies(res);
            // ! dev
            if (configSite.status === status.dev)
              console.log(
                'Запрос на сервер с целью получить сохраненные фильмы вернул',
                res,
              );
          }
        })
        .catch((err) => {
          // ! dev
          if (configSite.status === status.dev)
            console.log(
              `Запрос на сервер с целью получить сохраненные фильмы выдал: [${err.message}]`,
            );

          // показываем уведомление об ошибке
          if (!err.status)
            addNotification({
              name: '500',
              type: 'error',
              text: checkAnswerFromServer('all', 'failFetch'),
            });
        })
        .finally(() => setRequestProcessed(false));
    fetch();
  }, []);

  //
  useEffect(() => {
    // filteredAndSetMovies(isActiveShortFilm);
    filteredAndSetMovies(isActiveShortFilm);
  }, [savedMovies]);

  // * useEffect`s
  // достаем фильтр короткометражек из // ? localstorage
  useEffect(() => {
    if (['true', 'false'].includes(localStorage.getItem(shortFilmName))) {
      setIsActiveShortFilm(JSON.parse(localStorage.getItem(shortFilmName)));
    }
  }, []);

  // отрисовываем карточки если строка поиска не пустая
  useEffect(() => {
    const _isSearchWordNull = searchWord === null;

    if (!_isSearchWordNull) {
      setIsPreloaderActive(true);
      setInputReadOnly(true);
      // устанавливаем фильтрованные фильмы
      filteredAndSetMovies(
        isActiveShortFilm,
        _isSearchWordNull ? '' : searchWord.toLowerCase(),
      );

      setIsPreloaderActive(false);
      setInputReadOnly(false);
    }
  }, [savedMovies]);

  // отрисовка при изменении сохраненных фильмов
  // нужно для удаления фильмов (что бы удаленный фильм не отрисовывался)
  useEffect(() => {
    filteredAndSetMovies(isActiveShortFilm, searchWord);
  }, [savedMovies]);

  // * function`s
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
  function toggleShortFilm() {
    // устанавливаем в localStorage новое значение
    localStorage.setItem(shortFilmName, !isActiveShortFilm);

    !isActiveShortFilm
      ? // устанавливаем фильтрованные фильмы
        setFilteredMovies(filteredMovies.filter(_shortMovies))
      : setFilteredMovies(
          savedMovies.filter((movie) =>
            _searchMovies(movie, searchWord ? searchWord : ''),
          ),
        );

    setIsActiveShortFilm(!isActiveShortFilm);

    // ! dev
    if (configSite.status === status.dev)
      console.log(`Состояние короткометражек сейчас: [${!isActiveShortFilm}]`);
  }

  // фильтр фильмов
  function handleSearchMovies(isActive) {
    const _searchWord = searchRef.current.value;

    // если поиск новый, то начинаем отрисовку
    if (_searchWord.toLowerCase() !== searchWord) {
      setSearchWord(_searchWord.toLowerCase());

      setIsPreloaderActive(true);
      setInputReadOnly(true);
      // устанавливаем фильтрованные фильмы
      filteredAndSetMovies(isActive, _searchWord.toLowerCase());

      setIsPreloaderActive(false);
      setInputReadOnly(false);

      // ! dev
      if (configSite.status === status.dev)
        console.log(
          `Поисковое слово сохранено в localStorage: [${_searchWord}]`,
        );
    }
  }

  // фильтруем и устанавливаем фильмы
  function filteredAndSetMovies(isActive, _searchWord) {
    const _isSearchWordNull = _searchWord === null;
    // устанавливаем фильтрованные фильмы
    setFilteredMovies(
      savedMovies
        .filter((movie) =>
          _searchMovies(movie, _isSearchWordNull ? '' : _searchWord),
        )
        .filter(isActive ? _shortMovies : () => true),
    );
  }

  return (
    <section className='SavedMovies'>
      <SearchForm
        shortFilm={{
          isActive: isActiveShortFilm,
          toggle: toggleShortFilm,
        }}
        onSubmit={handleSearchMovies}
        input={{
          id: 'search',
          ref: searchRef,
          readOnly: isInputReadOnly,
        }}
      />
      {!isRequestProcessed || !isPreloaderActive ? (
        <MoviesCardList
          isPreloaderActive={isPreloaderActive}
          setMovies={setSavedMovies}
          cardList={filteredMovies}
          place='saved-movies'
        />
      ) : (
        <Preloader />
      )}
    </section>
  );
}

export default SavedMovies;

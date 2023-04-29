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
  const [searchWord, setSearchWord] = useState('');
  // нажат ли кнопка поиска
  const [isPressedSubmit, setPressedSubmit] = useState(false);

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

  // достаем поисковое слово из // ? localstorage
  useEffect(() => {
    // достаем из localstorage
    const _searchWord = localStorage.getItem(searchWordName) || ' ';

    // устанавливаем в нижнем регистре
    setSearchWord(_searchWord.toLowerCase());
    // устанавливаем в поисковую строку в том виде как было
    searchRef.current.value = _searchWord;
  }, []);

  // todo
  useEffect(() => {
    isPressedSubmit && filteredAndSetMovies(isActiveShortFilm, searchWord);
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
  function toogleShortFilm() {
    // устанавливаем в localStorage новое значение
    localStorage.setItem(shortFilmName, !isActiveShortFilm);

    // фильтруем только если была нажата кнопка поиска
    isPressedSubmit &&
      (!isActiveShortFilm
        ? // устанавливаем фильтрованные фильмы
          setFilteredMovies(filteredMovies.filter(_shortMovies))
        : setFilteredMovies(
            savedMovies.filter((movie) => _searchMovies(movie, searchWord)),
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

      setIsPreloaderActive(false);
      setInputReadOnly(false);

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
    setFilteredMovies(
      savedMovies
        .filter((movie) => _searchMovies(movie, _searchWord))
        .filter(isActive ? _shortMovies : () => true),
    );
  }

  return (
    <section className='SavedMovies'>
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
      {!isRequestProcessed || !isPreloaderActive ? (
        <MoviesCardList
          isPressedSubmit={isPressedSubmit}
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

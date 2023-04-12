// * react
import React from 'react';

// ? стили
import './Main.css';

// ? компоненты
import Promo from './../Promo/Promo';
import NavTab from './../NavTab/NavTab';
import AboutProject from './../AboutProject/AboutProject';
import Techs from './../Techs/Techs';
import AboutMe from './../AboutMe/AboutMe';

function Main() {
  return (
    <main className={'main'}>
      <Promo />

      <NavTab />

      <AboutProject />

      <Techs />

      <AboutMe />
    </main>
  );
}

export default Main;

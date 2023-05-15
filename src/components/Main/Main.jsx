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
    <main className='main'>
      <Promo />

      <NavTab />

      <AboutProject serialNumber={0} />

      <Techs serialNumber={1} />

      <AboutMe serialNumber={2} />
    </main>
  );
}

export default Main;

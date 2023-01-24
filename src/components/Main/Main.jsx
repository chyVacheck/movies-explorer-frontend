/* eslint-disable react-hooks/exhaustive-deps */

// * react

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
    <section className={'main'}>

      <Promo />

      <NavTab />

      <AboutProject />

      <Techs />

      <AboutMe />

    </section>
  );
}

export default Main;

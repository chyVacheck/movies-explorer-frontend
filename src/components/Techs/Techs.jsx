/* eslint-disable react-hooks/exhaustive-deps */

// * react

// ? стили
import './Techs.css';

// ? из констант
import { mainNavigationRouters as routers } from './../../utils/Constants';
import LandingBlock from '../LandingBlock/LandingBlock';

function Techs() {

  return (
    <LandingBlock
      nameOfClass={'techs'}
      setting={{
        big: false,
        grey: true,
      }}
      title={routers[1].context}
    >

      <h3 className='techs__title'>
        7 технологий
      </h3>

      <p className='techs__text'>
        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
      </p>

      <ul className='techs__list'>
        <li className='techs__list-item'>
          HTML
        </li>
        <li className='techs__list-item'>
          CSS
        </li>
        <li className='techs__list-item'>
          JS
        </li>
        <li className='techs__list-item'>
          React
        </li>
        <li className='techs__list-item'>
          Git
        </li>
        <li className='techs__list-item'>
          Express.js
        </li>
        <li className='techs__list-item'>
          mongoDB
        </li>
      </ul>

    </LandingBlock>
  );
}

export default Techs;
// * react
import React from 'react';

// ? стили
import './Techs.css';

// ? из констант
import { mainNavigationRouters as routers } from './../../utils/Constants';
import LandingBlock from '../LandingBlock/LandingBlock';

function Techs({ serialNumber }) {
  return (
    <LandingBlock
      id='techs'
      nameOfClassTitle='techs__lending-title'
      nameOfClass='techs'
      setting={{
        big: false,
        grey: true,
      }}
      title={routers[serialNumber].context}
    >
      <h3 className='techs__title'>7 Techs</h3>

      <p className='techs__text'>
        In the web development course, we learned the technologies that we
        applied in the thesis project.
      </p>

      <ul className='techs__list'>
        <li className='techs__list-item'>HTML</li>
        <li className='techs__list-item'>CSS</li>
        <li className='techs__list-item'>JS</li>
        <li className='techs__list-item'>React</li>
        <li className='techs__list-item'>Git</li>
        <li className='techs__list-item'>Express.js</li>
        <li className='techs__list-item'>mongoDB</li>
      </ul>
    </LandingBlock>
  );
}

export default Techs;

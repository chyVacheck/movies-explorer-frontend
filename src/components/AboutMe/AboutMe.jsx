// * react
import React from 'react';

// ? стили
import './AboutMe.css';

// ? фото
import photo from './../../images/photo_Dmytro.jpg';

// ? из констант
import { mainNavigationRouters as routers } from './../../utils/Constants';

// ? компоненты
import LandingBlock from '../LandingBlock/LandingBlock';
import Portfolio from './../Portfolio/Portfolio';

function AboutMe() {
  return (
    <LandingBlock
      id='about-me'
      nameOfClass={'aboutMe'}
      setting={{
        big: true,
        grey: false,
      }}
      title={routers[2].context}
    >
      <div className='aboutMe__info-img'>
        <div className='aboutMe__info'>
          <h3 className='aboutMe__title'>Дмитрий</h3>

          <h4 className='aboutMe__sub-title'>Фронтенд-разработчик, 20 лет</h4>

          <p className='aboutMe__text'>
            Я живу в Германии. У меня есть любимое занятие и любимая девушка,
            она на фото. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно
            начал кодить. С 2022 года я начал учиться веб-разработке на курсах
            от компании ЯндкексПрактикум. После того, как прошёл часть курса по
            веб-разработке, начал заниматься фриланс-заказами, а сейчас в поиске
            постоянной работы.
          </p>

          <a
            lang='en'
            className='aboutMe__link link'
            href='https://github.com/chyVacheck'
            target='_blank'
            rel='noreferrer'
          >
            Github
          </a>
        </div>

        <img className='aboutMe__img' src={photo} alt='фото моей девушки' />
      </div>

      <Portfolio />
    </LandingBlock>
  );
}

export default AboutMe;

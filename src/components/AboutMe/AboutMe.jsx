/* eslint-disable react-hooks/exhaustive-deps */

// * react

// ? стили
import './AboutMe.css';

// ? фото
import photo from './../../images/photo_Dmytro.jpg';

// ? из констант
import { mainNavigationRouters as routers } from './../../utils/Constants';
import LandingBlock from '../LandingBlock/LandingBlock';

function AboutMe() {

  return (
    <LandingBlock
      nameOfClass={'aboutMe'}
      setting={{
        big: true,
        grey: false,
      }}
      title={routers[2].context}
    >

      <div className='aboutMe__info-img'>
        <div className='aboutMe__info'>
          <h3 className='aboutMe__title'>
            Дмитрий
          </h3>

          <h4 className='aboutMe__sub-title'>
            Фронтенд-разработчик, 20 лет
          </h4>

          <p className='aboutMe__text'>
            Я живу в Германии. У меня есть любимое занятие и любимая девушка, она на фото справа.
            Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2022 года я начал учиться веб-разработке на курсах от компании ЯндкексПрактикум. После того, как прошёл часть курса по веб-разработке, начал заниматься фриланс-заказами, а сейчас в поиске постоянной работы.
          </p>

          <a
            lang='en'
            className='aboutMe__link link'
            href='https://github.com/chyVacheck'
            target="_blank" rel="noreferrer" >
            Github
          </a>
        </div>

        <img className='aboutMe__img' src={photo} alt="фото моей девушки" />
      </div>

      <div className='aboutMe__portfolio'>
        <h3 className='aboutMe__portfolio-title'>
          Портфолио
        </h3>

        <div className='aboutMe__portfolio-list-web-sites'>

          <div className='aboutMe__portfolio-web-site'>
            <h4 className='aboutMe__portfolio-web-site-name'>
              Статичный сайт
            </h4>

            <a
              href='https://github.com/chyVacheck/how-to-learn'
              target="_blank"
              rel="noreferrer"
              className='aboutMe__portfolio-web-site-arrow link'
            >
              ↗
            </a>
          </div>

          <div className='aboutMe__portfolio-web-site'>
            <h4 className='aboutMe__portfolio-web-site-name'>
              Адаптивный сайт
            </h4>

            <a
              href='https://chyvacheck.github.io/russian-travel/'
              target="_blank"
              rel="noreferrer"
              className='aboutMe__portfolio-web-site-arrow link'
            >
              ↗
            </a>
          </div>

          <div className='aboutMe__portfolio-web-site aboutMe__portfolio-web-site_border_no-border'>
            <h4 className='aboutMe__portfolio-web-site-name'>
              Одностраничное приложение
            </h4>

            <a
              href='https://github.com/chyVacheck/react-mesto-api-full-gha'
              target="_blank"
              rel="noreferrer"
              className='aboutMe__portfolio-web-site-arrow link'
            >
              ↗
            </a>
          </div>
        </div>



      </div>

    </LandingBlock>
  );
}

export default AboutMe;

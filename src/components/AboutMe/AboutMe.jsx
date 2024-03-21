// * react
import React from 'react';

// ? стили
import './AboutMe.css';

// ? из констант
import { mainNavigationRouters as routers } from './../../utils/Constants';

// ? компоненты
import LandingBlock from '../LandingBlock/LandingBlock';
import Portfolio from './../Portfolio/Portfolio';

function AboutMe({ serialNumber }) {
  function getAge(dateOfBirth) {
    const currentDate = new Date();
    let age = currentDate.getFullYear() - dateOfBirth.getFullYear();
    const isBirthdayPassed =
      currentDate.getMonth() > dateOfBirth.getMonth() ||
      (currentDate.getMonth() === dateOfBirth.getMonth() &&
        currentDate.getDate() >= dateOfBirth.getDate());
    if (!isBirthdayPassed) age--;
    return age;
  }

  return (
    <LandingBlock
      id='about-me'
      nameOfClass='aboutMe'
      setting={{
        big: true,
        grey: false,
      }}
      title={routers[serialNumber].context}
    >
      <div className='aboutMe__info-img'>
        <div className='aboutMe__info'>
          <h3 className='aboutMe__title'>Dmytro</h3>

          <h4 className='aboutMe__sub-title'>
            Fullstack-developer {getAge(new Date('2002-12-19'))} years old
          </h4>

          <div>
            <p className='aboutMe__text'>
              I am a web developer with a year of experience who was educated at
              Yandex Practicum. My projects, consisting of 80% of practice,
              include single-page websites, an adaptive website and a
              full-fledged web application for movies with authorization and
              registration. I am a diligent, stress-resistant and purposeful
              person who always tries to finish the job. My creativity helps me
              to quickly &quot;catch fire&quot; with an idea and get a boost of
              inspiration and emotions. I have the skills of HTML, CSS, JS, Git,
              GitHub, MongoDB, Node.js, Express, React, and also started
              learning React Native. I created websites using flex, grid and
              BEM, and also wrote code for front-end and back-end web
              applications. I am determined to continue developing in the field
              of web development and am ready for new challenges and tasks.
            </p>
          </div>

          <div className='aboutMe__links'>
            <a
              lang='en'
              className='aboutMe__link link'
              href='https://github.com/chyVacheck'
              target='_blank'
              rel='noreferrer'
            >
              <svg
                aria-hidden='true'
                viewBox='0 0 16 16'
                version='1.1'
                fill='currentColor'
                width='24'
                height='24'
              >
                <path d='M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z'></path>
              </svg>
              <span>Github</span>
            </a>

            <a
              lang='en'
              className='aboutMe__link link'
              href='https://www.linkedin.com/in/dmytro-shakh/'
              target='_blank'
              rel='noreferrer'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                data-supported-dps='24x24'
                fill='currentColor'
                width='24'
                height='24'
              >
                <path d='M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z'></path>
              </svg>
              <span>Linkedin</span>
            </a>
          </div>
        </div>

        <img
          className='aboutMe__img'
          src='https://avatars.githubusercontent.com/u/76044670'
          alt='My avatar in github'
        />
      </div>

      <Portfolio />
    </LandingBlock>
  );
}

export default AboutMe;

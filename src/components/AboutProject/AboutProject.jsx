// * react
import React from 'react';

// ? стили
import './AboutProject.css';

// ? из констант
import { mainNavigationRouters as routers } from './../../utils/Constants';
import LandingBlock from '../LandingBlock/LandingBlock';

function AboutProject() {
  return (
    <LandingBlock
      id='about-project'
      nameOfClass='aboutProject'
      setting={{
        big: true,
        grey: false,
      }}
      title={routers[0].context}
    >
      <div className='aboutProject__columns'>
        {/* 5 этапов */}
        <div className='aboutProject__column'>
          <h3 className='aboutProject__column-title'>
            Дипломный проект включал 5 этапов
          </h3>

          <p className='aboutProject__column-text'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>

        {/* 5 недель */}
        <div className='aboutProject__column'>
          <h3 className='aboutProject__column-title'>
            На выполнение диплома ушло 5 недель
          </h3>

          <p className='aboutProject__column-text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>

      <div className='aboutProject__lines-time-work'>
        {/* 1 неделя */}
        <div className='aboutProject__week'>
          <h4 className='aboutProject__week-title aboutProject__week-title_color_light'>
            1 неделя
          </h4>
          <p className='aboutProject__week-text'>Back-end</p>
        </div>

        {/* 4 недели */}
        <div className='aboutProject__week'>
          <h4 className='aboutProject__week-title'>4 недели</h4>
          <p className='aboutProject__week-text'>Front-end</p>
        </div>
      </div>
    </LandingBlock>
  );
}

export default AboutProject;

// * react
import React from 'react';

// ? стили
import './AboutProject.css';

// ? из констант
import { mainNavigationRouters as routers } from './../../utils/Constants';
import LandingBlock from '../LandingBlock/LandingBlock';

function AboutProject({ serialNumber }) {
  return (
    <LandingBlock
      id='about-project'
      nameOfClass='aboutProject'
      setting={{
        big: true,
        grey: false,
      }}
      title={routers[serialNumber].context}
    >
      <div className='aboutProject__columns'>
        {/* 5 этапов */}
        <div className='aboutProject__column'>
          <h3 className='aboutProject__column-title'>
            Current project includes 5 steps
          </h3>

          <p className='aboutProject__column-text'>
            Scheduling, backend work, layout, adding functionality and final
            tweaks.
          </p>
        </div>

        {/* 5 недель */}
        <div className='aboutProject__column'>
          <h3 className='aboutProject__column-title'>
            It took 5 weeks to complete the diploma
          </h3>

          <p className='aboutProject__column-text'>
            Each stage had a soft and hard deadline that had to be in order to
            successfully defend themselves.
          </p>
        </div>
      </div>

      <div className='aboutProject__lines-time-work'>
        {/* 1 неделя */}
        <div className='aboutProject__week'>
          <h4 className='aboutProject__week-title aboutProject__week-title_color_light'>
            1 week
          </h4>
          <p className='aboutProject__week-text'>Back-end</p>
        </div>

        {/* 4 недели */}
        <div className='aboutProject__week'>
          <h4 className='aboutProject__week-title'>4 weeks</h4>
          <p className='aboutProject__week-text'>Front-end</p>
        </div>
      </div>
    </LandingBlock>
  );
}

export default AboutProject;

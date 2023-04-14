// * react
import React from 'react';

// ? стили
import './Portfolio.css';

// ? компоненты

function Portfolio() {
  return (
    <article className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>

      <ul className='portfolio__list-web-sites'>
        {/* how to learn */}
        <li>
          <a
            href='https://github.com/chyVacheck/how-to-learn'
            target='_blank'
            rel='noreferrer'
            className='portfolio__web-site link'
          >
            <h4 className='portfolio__web-site-name'>Статичный сайт</h4>

            <span className='portfolio__web-site-arrow'>↗</span>
          </a>
        </li>

        {/* russian travel */}
        <li>
          <a
            href='https://chyvacheck.github.io/russian-travel/'
            target='_blank'
            rel='noreferrer'
            className='portfolio__web-site link'
          >
            <h4 className='portfolio__web-site-name'>Адаптивный сайт</h4>

            <span className='portfolio__web-site-arrow'>↗</span>
          </a>
        </li>

        {/* mesto */}
        <li>
          <a
            href='https://github.com/chyVacheck/react-mesto-api-full-gha'
            target='_blank'
            rel='noreferrer'
            className='portfolio__web-site portfolio__web-site_last_last link'
          >
            <h4 className='portfolio__web-site-name'>
              Одностраничное приложение
            </h4>

            <span className='portfolio__web-site-arrow'>↗</span>
          </a>
        </li>
      </ul>
    </article>
  );
}

export default Portfolio;

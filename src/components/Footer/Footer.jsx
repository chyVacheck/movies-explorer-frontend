// * react
import React, { useEffect, useState } from 'react';

// ? стили
import './Footer.css';

// ? constants
import { YEAR, activeFooterRoutes as activ } from './../../utils/Constants.js';

function Footer({ page }) {
  const [year, setYear] = useState(`${YEAR}`);
  const currentYear = new Date().getFullYear();

  // ? отрисовка элемента
  const [isActive, setIsActive] = useState(false);

  // отображение года
  useEffect(() => {
    if (currentYear === YEAR) {
      setYear(currentYear);
    } else {
      setYear(`${YEAR}-${currentYear}`);
    }
  }, [currentYear]);

  // Проверка на отрисовку элемента
  useEffect(() => {
    if (activ.includes(page)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [page]);

  return (
    isActive && (
      <footer className='footer'>
        <h6 className='footer__title'>
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h6>

        <div className='footer__info'>
          {/* © */}
          <p className='footer__info-text footer__info-text_type_copyright'>
            © {year}
          </p>

          <div className='footer__info-texts'>
            <p className='footer__info-text'>Яндекс.Практикум</p>

            <a
              href='https://github.com/chyVacheck'
              className='footer__info-text link'
              target={'_blank'}
              rel='noreferrer'
            >
              Github
            </a>
          </div>
        </div>
      </footer>
    )
  );
}

export default Footer;

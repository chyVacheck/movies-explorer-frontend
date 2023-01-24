
// * react
import { useEffect, useState } from 'react';

// ? стили
import './Footer.css';

// ? constants
import { YEAR, unActiveNavbarAndButtonRouters as unActiv } from './../../utils/Constants.js';

function Footer({ page }) {

  const [year, setYear] = useState(`${YEAR}`);
  const currentYear = new Date().getFullYear();

  // ? отрисовка элемента 
  const [isActive, setIsActive] = useState(false);

  // отображение года
  useEffect(() => {
    if (currentYear === YEAR) {
      setYear(currentYear)
    } else {
      setYear(`${YEAR}-${currentYear}`)
    }
  }, [currentYear]);

  // Проверка на отрисовку элемента
  useEffect(() => {
    if (unActiv.includes(page)) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [page]);

  return (
    isActive && <footer className={'footer'}>
      <h6 className='footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h6>

      <div className='footer__info'>
        <p className='footer__info-text footer__info-text_type_copyright'>
          © {year}
        </p>

        <p className='footer__info-text'>
          Яндекс.Практикум
        </p>

        <a
          href='https://github.com/chyVacheck'
          className='footer__info-text link'
          target={'_blank'}
          rel="noreferrer"
        >
          Github
        </a>

      </div>


    </footer>
  );
}

export default Footer;


// * react
import { useEffect, useState } from 'react';

// ? стили
import './Footer.css';

// ? константы
import { YEAR } from './../../utils/Constants';

function Footer() {

  const [year, setYear] = useState(`${YEAR}`);
  const currentYear = new Date().getFullYear();

  // отображение года
  useEffect(() => {
    if (currentYear === YEAR) {
      setYear(currentYear)
    } else {
      setYear(`${YEAR}-${currentYear}`)
    }
  }, [currentYear]);

  return (
    <footer className={'footer'}>
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

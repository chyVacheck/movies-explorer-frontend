/* eslint-disable react-hooks/exhaustive-deps */

// * react
import { NavLink } from 'react-router-dom';
// ? стили
import './PageNotFound.css';

// ? константы
import { paths } from '../../utils/Constants';

function PageNotFound() {

  return (
    <section className={'pageNotFound'}>

      <div className='pageNotFound__status'>
        <h1 className='pageNotFound__status-code'>
          404
        </h1>
        <p className='pageNotFound__status-message'>
          Страница не найдена
        </p>
      </div>


      <NavLink to={paths.aboutProject} className={'pageNotFound__link link'}>
        Назад
      </NavLink>


    </section>
  );
}

export default PageNotFound;

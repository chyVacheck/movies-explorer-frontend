// * react
import React, { useEffect, useState } from 'react';

// ? стили
import './BurgerMenu.css';

// ? компоненты
import BurgerMenuButton from '../BurgerMenuButton/BurgerMenuButton';
import ButtonProfile from './../ButtonProfile/ButtonProfile';
import Navigation from './../Navigation/Navigation';

// ? constants

function BurgerMenu({ isActive, setIsActive, loggedIn }) {
  // ? отрисовка элемента
  const [className, setClassName] = useState('');

  // className
  useEffect(() => {
    setClassName(`BurgerMenu ${isActive ? 'BurgerMenu_active_active' : ''}`);
  }, [isActive]);

  function closeBurgerMenu() {
    setIsActive(false);
  }

  return (
    <article className={className}>
      <div className='BurgerMenu__button'>
        <BurgerMenuButton
          isActive={isActive}
          setIsActive={setIsActive}
          loggedIn={loggedIn}
        />
      </div>

      <Navigation
        place={'BurgerMenu'}
        loggedIn={loggedIn}
        closeBurgerMenu={closeBurgerMenu}
      />

      <ButtonProfile
        place={'BurgerMenu'}
        loggedIn={loggedIn}
        closeBurgerMenu={closeBurgerMenu}
      />
    </article>
  );
}

export default BurgerMenu;

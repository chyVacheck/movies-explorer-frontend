// * react
import React from 'react';

// ? стили
import './BurgerMenuButton.css';

// ? компоненты

// ? constants

function BurgerMenuButton({ loggedIn, isActive, place, setIsActive }) {
  // ? className
  const className = `button BurgerMenuButton${
    place ? ` BurgerMenuButton_place_${place}` : ''
  } ${loggedIn ? 'BurgerMenuButton_loged_login' : ''} ${
    isActive ? 'BurgerMenuButton_active_active' : ''
  }`;

  return (
    <button
      onClick={() => {
        setIsActive(!isActive);
      }}
      className={className}
    >
      <span className='BurgerMenuButton__strip'></span>
      <span className='BurgerMenuButton__strip'></span>
      <span className='BurgerMenuButton__strip'></span>
    </button>
  );
}

export default BurgerMenuButton;

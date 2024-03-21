// * react
import React from 'react';

// ? стили
import './MoreButton.css';

// ? компоненты

// ? image

// ? constants

function MoreButton({ onClick }) {
  return (
    <article className='MoreButton'>
      <button
        onClick={onClick}
        className='button MoreButton__button'
        type='button'
      >
        More
      </button>
    </article>
  );
}

export default MoreButton;

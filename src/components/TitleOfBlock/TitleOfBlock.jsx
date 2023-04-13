// * react
import React from 'react';

// ? стили
import './TitleOfBlock.css';

function TitleOfBlock({ children, className }) {
  return (
    <div className={`titleOfBlock ${className}`}>
      <h2 className='titleOfBlock__title'>{children}</h2>
    </div>
  );
}

export default TitleOfBlock;

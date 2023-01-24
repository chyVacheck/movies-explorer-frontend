/* eslint-disable react-hooks/exhaustive-deps */

// * react

// ? стили
import './TitleOfBlock.css';

function TitleOfBlock({ children }) {


  return (
    <div className={'titleOfBlock'}>
      <h2 className='titleOfBlock__title'>
        {children}
      </h2>
    </div>
  );
}

export default TitleOfBlock;

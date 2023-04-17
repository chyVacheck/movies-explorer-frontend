// * react
import React, { useEffect, useState } from 'react';

// ? стили
import './LandingBlock.css';

// ? компоненты
import TitleOfBlock from '../TitleOfBlock/TitleOfBlock';

function LandingBlock({
  id,
  children = null,
  title = '',
  setting = { big: false, grey: false },
  nameOfClass = '',
  nameOfClassTitle = '',
}) {
  const [className, setClassName] = useState('landingBlock');

  useEffect(() => {
    if (setting.grey && setting.big) {
      setClassName(
        `landingBlock landingBlock_size_big landingBlock_bg-color_grey ${nameOfClass}`,
      );
    } else if (setting.grey) {
      setClassName(`landingBlock landingBlock_bg-color_grey ${nameOfClass}`);
    } else if (setting.big) {
      setClassName(`landingBlock landingBlock_size_big ${nameOfClass}`);
    }
  }, []);

  return (
    <article id={id} className={className}>
      <TitleOfBlock className={nameOfClassTitle}>{title}</TitleOfBlock>

      {children}
    </article>
  );
}

export default LandingBlock;

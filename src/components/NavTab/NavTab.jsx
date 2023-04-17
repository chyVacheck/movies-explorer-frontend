// * react
import React, { Link } from 'react-router-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';

// ? стили
import './NavTab.css';

// ? из констант
import { mainNavigationRouters as routers } from './../../utils/Constants';

function NavTab() {
  return (
    <nav className={'navTab'}>
      {routers.map((item, index) => {
        return (
          <AnchorLink
            key={index}
            href={`#${item.id}`}
            className='link navTab__link'
          >
            {item.context}
          </AnchorLink>
        );
      })}
    </nav>
  );
}

export default NavTab;

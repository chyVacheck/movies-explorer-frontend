// * react
import { Link } from 'react-router-dom';

// ? стили
import './NavTab.css';

// ? из констант
import { mainNavigationRouters as routers } from './../../utils/Constants';

function NavTab() {
  return (
    <section className={'navTab'}>
      {routers.map((item, index) => {
        return (
          <Link key={index} to={item.router} className={'link navTab__link'}>
            {item.context}
          </Link>
        );
      })}
    </section>
  );
}

export default NavTab;

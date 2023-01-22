
// ? стили
import './Logo.css';

import logo from './../../images/Logo.svg';

function Logo({onClick}) {

  return (
    <img onClick={onClick} className={'logo link'} src={logo} alt="logo" />
  );
}

export default Logo;

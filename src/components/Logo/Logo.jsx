// * react
import { useNavigate } from 'react-router-dom';

// ? стили
import './Logo.css';

// ? иконки
import logo from './../../images/Logo.svg';

// ? constants
import { paths } from './../../utils/Constants.js';

function Logo() {
  const navigate = useNavigate();

  function toAboutProject() {
    navigate(paths.aboutProject);
  }

  return (
    <img
      onClick={toAboutProject}
      className={'logo link'}
      src={logo}
      alt="logo"
    />
  );
}

export default Logo;

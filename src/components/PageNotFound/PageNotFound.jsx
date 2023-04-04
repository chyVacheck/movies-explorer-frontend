// * react
import { NavLink, useNavigate  } from "react-router-dom";
// ? стили
import "./PageNotFound.css";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <section className={"pageNotFound"}>
      <div className="pageNotFound__status">
        <h1 className="pageNotFound__status-code">404</h1>
        <p className="pageNotFound__status-message">Страница не найдена</p>
      </div>

      <NavLink onClick={() => navigate(-1)} className={"pageNotFound__link link"}>
        Назад
      </NavLink>
    </section>
  );
}

export default PageNotFound;

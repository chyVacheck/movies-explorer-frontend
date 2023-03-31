/* eslint-disable react-hooks/exhaustive-deps */

// * react

// ? стили
import "./Portfolio.css";

// ? компоненты

function Portfolio() {
  return (
    <article className={"portfolio"}>
      <h3 className="portfolio__title">Портфолио</h3>

      <div className="portfolio__list-projects">
        <div className="portfolio-web-site">
          <h4 className="portfolio-web-site-name">Статичный сайт</h4>

          <a
            href="https://github.com/chyVacheck/how-to-learn"
            target="_blank"
            rel="noreferrer"
            className="portfolio-web-site-arrow link"
          >
            ↗
          </a>
        </div>

        <div className="portfolio-web-site">
          <h4 className="portfolio-web-site-name">Адаптивный сайт</h4>

          <a
            href="https://chyvacheck.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
            className="portfolio-web-site-arrow link"
          >
            ↗
          </a>
        </div>

        <div className="portfolio-web-site">
          <h4 className="portfolio-web-site-name">Одностраничное приложение</h4>

          <a
            href="https://github.com/chyVacheck/react-mesto-api-full-gha"
            target="_blank"
            rel="noreferrer"
            className="portfolio-web-site-arrow link"
          >
            ↗
          </a>
        </div>
      </div>
    </article>
  );
}

export default Portfolio;

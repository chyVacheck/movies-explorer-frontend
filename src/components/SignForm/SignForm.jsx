// * react
import { NavLink } from 'react-router-dom';
// ? стили
import './SignForm.css';
// ? компоненты
import Logo from './../Logo/Logo';

function SignForm({
  title,
  inputs = [],
  submitButton,
  error,
  textUnderSubmit,
  link,
}) {
  return (
    <article className={'signForm'}>
      <Logo />

      <h1 className="signForm__title">{title}</h1>

      <form className="signForm__form">
        {/* // ? инпут поля */}
        <div className="signForm__fields">
          {inputs.map((item, index) => {
            return (
              <div key={index} className="signForm__field">
                <h6 lang={item.lang || 'ru'} className="signForm__field-name">
                  {item.name}
                </h6>

                <input
                  required
                  className="signForm__field-input"
                  placeholder={item.placeholder}
                  value={item.value}
                  onChange={() => {
                    console.log();
                  }}
                  type={item.type}
                ></input>
              </div>
            );
          })}
        </div>

        {/* // ? сообщение о ошибке */}
        <p className="signForm__error-message">{error}</p>

        {/* // ? кнопка submit */}
        <button className="signForm__submit button" type="submit">
          {submitButton.text}
        </button>

        <p className="signForm__text-under-submit">
          {textUnderSubmit}{' '}
          <NavLink className={'signForm__link link'} to={link.to}>
            {link.text}
          </NavLink>
        </p>
      </form>
    </article>
  );
}

export default SignForm;

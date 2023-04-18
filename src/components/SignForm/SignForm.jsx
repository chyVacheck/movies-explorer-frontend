// * react
import React, { NavLink } from 'react-router-dom';

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
  isValid,
  link,
  onChange,
  onSubmit,
}) {
  return (
    <article className='signForm'>
      <Logo />

      <h1 className='signForm__title'>{title}</h1>

      <form onSubmit={onSubmit} className='signForm__form'>
        {/* // ? инпут поля */}
        <div className='signForm__fields'>
          {inputs.map((item, index) => {
            return (
              <div key={index} className='signForm__field'>
                <h6 lang={item.lang || 'ru'} className='signForm__field-name'>
                  {item.name}
                </h6>

                <input
                  required={item.required}
                  className={`signForm__field-input${
                    !item.isValid
                      ? ' signForm__field-input_validity_invalid'
                      : ''
                  }`}
                  placeholder={item.placeholder}
                  id={item.id}
                  type={item.type}
                  minLength={item.minLength}
                  maxLength={item.maxLength}
                  ref={item.ref}
                  onChange={onChange}
                  pattern={item.pattern}
                ></input>
              </div>
            );
          })}
        </div>

        {/* // ? сообщение о ошибке */}
        <p className='signForm__error-message'>{error}</p>

        {/* // ? кнопка submit */}
        <button
          disabled={!isValid}
          className={`signForm__submit ${
            !isValid ? 'signForm__submit_validity_invalid' : 'button'
          }`}
          type='submit'
        >
          {submitButton.text}
        </button>

        <p className='signForm__text-under-submit'>
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

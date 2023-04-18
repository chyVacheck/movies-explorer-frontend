export function checkValidity(validity) {
  if (validity.tooShort) {
    return 'Поле слишком короткое';
  } else if (validity.tooLong) {
    return 'Поле слишком длинное';
  } else if (validity.patternMismatch) {
    return 'Поле должно быть другого формата';
  } else if (validity.valueMissing) {
    return 'Поле должно быть заполненно';
  }
  return '';
}

export function checkAnswerFromServer(status) {
  if (status === 400) {
    return 'Перепроверьте введенные данные';
  } else if (status === 401) {
    return 'Пользователь не авторизован';
  } else if (status === 403) {
    return 'У вас нет доступа';
  } else if (status === 404) {
    return 'По данному запросу ничего не нашлось';
  } else if (status === 409) {
    return 'Пользователь с таким email уже существует';
  } else if (status === 429) {
    return 'Слишком большое количество запросов, попробуйте позже';
  } else {
    return 'При регистрации пользователя произошла ошибка';
  }
}

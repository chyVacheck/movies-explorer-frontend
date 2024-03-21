// ? constants
import { typeOfErrorFromServer } from './Constants';

export function checkPattern(value, pattern) {
  var EMAIL_REGEXP = new RegExp(pattern, 'g');
  const isValid = EMAIL_REGEXP.test(value);
  return isValid;
}

export function checkValidity(input, pattern) {
  const validity = input.validity;
  if (validity.tooShort) {
    return 'Поле слишком короткое';
  } else if (validity.tooLong) {
    return 'Поле слишком длинное';
  } else if (pattern && !checkPattern(input.value, pattern)) {
    return 'Поле должно быть другого формата';
  } else if (validity.valueMissing) {
    return 'Поле должно быть заполнено';
  }
  return '';
}

export function checkAnswerFromServer(status, type) {
  return typeOfErrorFromServer[type][status];
}

// спасибо большое человеку кто написал это
// взял с сайта
// https://realadmin.ru/coding/sklonenie-na-javascript.html
export function declOfNum(number, words = ['min', 'mins']) {
  return words[number === 1 ? 0 : 1];
}

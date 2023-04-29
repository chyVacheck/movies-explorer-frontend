// ? constants
import { typeOfErrorFromServer } from './Constants';

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

export function checkAnswerFromServer(status, type) {
  return typeOfErrorFromServer[type][status];
}

// спасибо большое человеку кто написал это
// взял с сайта
// https://realadmin.ru/coding/sklonenie-na-javascript.html
export function declOfNum(number, words = ['минута', 'минуты', 'минут']) {
  return words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
  ];
}
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

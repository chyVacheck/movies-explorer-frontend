// ? constants
import { typeOfErrorFromServer } from './Constants';

export function checkPattern(value, pattern) {
  var EMAIL_REGEXP = new RegExp(pattern, 'g');
  const isValid = EMAIL_REGEXP.test(value);
  return isValid;
}

// generate error
export function checkValidity(input, pattern) {
  const validity = input.validity;
  if (validity.valueMissing) return 'Please fill out this field';
  if (validity.patternMismatch) return 'Please enter a valid value';
  if (validity.rangeOverflow) return 'Value is too high';
  if (validity.rangeUnderflow) return 'Value is too low';
  if (validity.stepMismatch) return 'Value does not fit the required steps';
  if (validity.tooLong) return 'Value is too long';
  if (validity.tooShort) return 'Value is too short';
  if (validity.typeMismatch) return 'Invalid value type';
  if (validity.customError) return 'An error occurred';
  if (validity.badInput) return 'Invalid input';
  if (pattern && !checkPattern(input.value, pattern))
    return 'The field should be in a different format';

  return '';
}

export function checkAnswerFromServer(status, type) {
  return typeOfErrorFromServer[type][status];
}

export function declOfNum(number, words = ['min', 'mins']) {
  return words[number === 1 ? 0 : 1];
}

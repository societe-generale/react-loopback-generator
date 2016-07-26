import * as types from '../constants/language';

export function select(lang) {
  return {type: types.SELECT, lang};
}

// @flow
import types from '../constants/language';

export default (lang: string) => ({ type: types.SELECT, lang });

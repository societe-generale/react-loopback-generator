import _ from 'lodash';
import moment from 'moment';
import counterpart from 'counterpart';

import types from '../constants/language';

function setLocale(lang) {
  counterpart.setLocale(lang);
  moment.locale(lang);
}

const initialState = {
  available: [
    { key: 'en', label: 'English' },
    { key: 'fr', label: 'Français' },
  ],
  selected: 'en',
};

if (global.navigator && global.navigator.language) {
  const key = navigator.language.match(/^[a-z]{2}/)[0];
  if (_.find(initialState.available, { key })) {
    initialState.selected = key;
  }
}

setLocale(initialState.selected);

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SELECT:
      setLocale(action.lang);
      return {
        ...initialState,
        selected: action.lang,
      };
    default:
      return state;
  }
}

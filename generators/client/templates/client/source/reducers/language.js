import _ from 'lodash';

import types from '../constants/language';

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

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SELECT:
      return {
        ...initialState,
        selected: action.lang,
      };
    default:
      return state;
  }
}

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import generatedReducers from './reducers.json';

const reducers = generatedReducers.reduce((acc, reducerkey) => {
  // eslint-disable-next-line global-require,import/no-dynamic-require
  const reducer = require(`./${reducerkey}`).default;
  return { ...acc, ...{ [reducerkey]: reducer } };
}, {});

const rootReducer = combineReducers({
  ...reducers,
  ...{ routing: routerReducer },
});

export default rootReducer;

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { assign, merge } from 'lodash';

import generatedReducers from './reducers.json';

const reducers = merge(
  ...generatedReducers.map(name => ({ [name]: require(`./${name}`).default })), // eslint-disable-line
);

const rootReducer = combineReducers(
  assign(reducers, {
    routing: routerReducer,
  }),
);

export default rootReducer;

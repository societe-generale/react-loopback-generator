import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { assign, merge } from 'lodash';

import generatedReducers from './reducers.json';

const reducers = merge(...generatedReducers.map(name =>
  ({ [name]: require(`./${name}`).default })), // eslint-disable-line
);

const models = [];
const modelReducers = merge(...models.map(name =>
  ({ [name]: require(`./models/${name}`).default }) // eslint-disable-line
));

const rootReducer = combineReducers(assign(reducers, {
  routing: routerReducer,
  models: combineReducers(modelReducers),
}));

export default rootReducer;

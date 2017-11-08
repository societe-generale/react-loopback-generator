import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authentication from './authentication';
import language from './language';
import networking from './networking';
import sideBar from './side-bar';

const rootReducer = combineReducers({
  routing: routerReducer,
  authentication,
  language,
  networking,
  sideBar,
});

export default rootReducer;

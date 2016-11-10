import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import persistState, { mergePersistedState } from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import filter from 'redux-localstorage-filter';

import rootReducer from '../reducers';

export default function configureStore(history) {
  const logger = createLogger({
    level: process.env.NODE_ENV === 'production' ? 'error' : 'log',
    collapsed: true,
  });
  const reduxRouterMiddleware = routerMiddleware(history);

  const reducers = compose(mergePersistedState())(rootReducer);
  const storageAuth = compose(filter('authentication'))(adapter(window.localStorage));
  const storageLang = compose(filter('language'))(adapter(window.localStorage));

  var createCustomStore = compose(
    persistState(storageAuth, 'authentication'),
    persistState(storageLang, 'language'),
  )(createStore);

  createCustomStore = applyMiddleware(
    reduxRouterMiddleware,
    thunk,
    logger,
  )(createCustomStore);

  const store = createCustomStore(reducers);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

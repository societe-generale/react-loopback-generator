import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import persistState, { mergePersistedState } from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import filter from 'redux-localstorage-filter';

import rootReducer from '../reducers';

export default function configureStore(history) {
  const reduxRouterMiddleware = routerMiddleware(history);
  const reducers = compose(mergePersistedState())(rootReducer);
  const storageAuth = compose(filter('authentication'))(adapter(window.localStorage));
  const storageLang = compose(filter('language'))(adapter(window.localStorage));

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
      typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  /* eslint-enable */

  let createCustomStore = composeEnhancers(
    persistState(storageAuth, 'authentication'),
    persistState(storageLang, 'language'),
  )(createStore);

  const middlewares = [
    reduxRouterMiddleware,
    thunk,
  ];

  createCustomStore = applyMiddleware(...middlewares)(createCustomStore);

  const store = createCustomStore(reducers);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

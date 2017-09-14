import React from 'react';
import { render } from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';

import AppRootContainer from './main';

import configureStore from './stores/configure-store';

const browserHistory = createBrowserHistory();
const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

injectTapEventPlugin();

render(
  <AppRootContainer store={store} history={history} />,
  document.getElementById('content'),
);

import React from 'react';
import { render } from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';

import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import AppRootContainer from './main';

import configureStore from './stores/configure-store';

const store = configureStore(hashHistory);
const history = syncHistoryWithStore(hashHistory, store);

injectTapEventPlugin();

render(
  <AppRootContainer store={store} history={history} />,
  document.getElementById('content'),
);

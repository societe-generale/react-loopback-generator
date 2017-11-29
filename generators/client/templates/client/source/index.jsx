import React from 'react';
import { render } from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
import { createBrowserHistory } from 'history';

import AppRootContainer from './main';

import configureStore from './stores/configure-store';

const browserHistory = createBrowserHistory();
const store = configureStore(browserHistory);

injectTapEventPlugin();

render(
  <AppRootContainer store={store} history={browserHistory} />,
  document.getElementById('content'),
);

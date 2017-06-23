import React from 'react';
import { render } from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from './stores/configure-store';

import AppRoot from './main';

const store = configureStore(hashHistory);
const history = syncHistoryWithStore(hashHistory, store);

injectTapEventPlugin();

const renderApp = (RootContainer) => {
  render(
    <AppContainer>
      <RootContainer store={store} history={history} />
    </AppContainer>,
    document.getElementById('content'),
  );
};

renderApp(AppRoot);

if (module.hot) {
  // React hot reload
  module.hot.accept('./main', () => {
    renderApp(require('./main').default); // eslint-disable-line
  });
}

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import counterpart from 'counterpart';
import moment from 'moment';
import { syncHistoryWithStore } from 'react-router-redux';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import 'flexboxgrid';
import './main.css';

import Root from './containers/root';
import HomeView from './containers/home-view';

import configureStore from './stores/configure-store';

import localeFr from './locale/locale-fr.json';
import localeEn from './locale/locale-en.json';

const store = configureStore(hashHistory);
const history = syncHistoryWithStore(hashHistory, store);

moment.locale('en');
moment.locale('fr');
counterpart.registerTranslations('en', localeEn);
counterpart.registerTranslations('fr', localeFr);

injectTapEventPlugin();

const muiTheme = getMuiTheme(lightBaseTheme);

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router history={history}>
        <Route path="/" component={Root}>
          <IndexRoute component={HomeView} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('content'),
);

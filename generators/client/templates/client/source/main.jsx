import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import counterpart from 'counterpart';
import moment from 'moment';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import 'flexboxgrid';
import './main.css';

import localeFr from './locale/locale-fr.json';
import localeEn from './locale/locale-en.json';

import routes from './routes';

moment.locale('en');
moment.locale('fr');
counterpart.registerTranslations('en', localeEn);
counterpart.registerTranslations('fr', localeFr);

const muiTheme = getMuiTheme(lightBaseTheme);

class AppRoot extends React.Component {

  static propTypes = {
    store: React.PropTypes.object.isRequired, // eslint-disable-line
    history: React.PropTypes.object.isRequired, // eslint-disable-line
  };

  constructor(props) {
    super(props);
    this.routes = routes;
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Router history={this.props.history} routes={this.routes} />
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default AppRoot;

import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import 'flexboxgrid';
import './main.css';
import RootConnected from './containers/root';

const muiTheme = getMuiTheme(lightBaseTheme);

class AppRoot extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired, // eslint-disable-line
    history: PropTypes.object.isRequired, // eslint-disable-line
  };

  render() {
    return (
      <Provider store={this.props.store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <BrowserRouter basename="/" >
            <Route path="/" component={RootConnected} />
          </BrowserRouter>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default AppRoot;

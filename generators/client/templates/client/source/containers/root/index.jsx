import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { IntlProvider, addLocaleData } from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import en from 'react-intl/locale-data/en';
import HeaderBar from '../../components/header-bar';
import SideBar from '../../components/side-bar';
import frMessages from '../../locale/locale-fr.json';
import enMessages from '../../locale/locale-en.json';

import * as AuthenticationEffect from '../../effects/authentication';
import * as SideBarAction from '../../actions/side-bar';


const locales = {
  fr: frMessages,
  en: enMessages,
};

addLocaleData([...fr, ...en]);

export class Root extends Component {

  componentWillMount() {
    this.props.authenticationEffects.login()
    .catch(() => {
      // To avoid 401 error when page loaded from cache
      window.location.reload(true);
    });
  }

  doLogout() {
    this.props.authenticationEffects.logout();
  }

  render() {
    if (_.isEmpty(this.props.authentication)) return (<div />);
    return (
      <IntlProvider locale={this.props.languageSelected} messages={locales[this.props.languageSelected]}>
        <div>
          <HeaderBar
            onOpenSideBar={this.props.sideBarActions.open}
          />
          <SideBar
            open={this.props.sideBar.open}
            onCloseSideBar={this.props.sideBarActions.close}
            onLogout={this.props.authenticationEffects.logout}
          />
          {this.props.children}
        </div>
      </IntlProvider>
    );
  }

}

Root.propTypes = {
  languageSelected: PropTypes.string,
  authentication: PropTypes.shape({
    id: PropTypes.string,
  }),
  authenticationEffects: PropTypes.shape({
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  }).isRequired,
  sideBar: PropTypes.shape({
    open: PropTypes.bool,
  }),
  sideBarActions: PropTypes.shape({
    open: PropTypes.func,
    close: PropTypes.func,
  }),
  children: PropTypes.element,
};

function mapStateToProps(state) {
  return {
    languageSelected: state.language.selected,
    authentication: state.authentication,
    sideBar: state['side-bar'],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authenticationEffects: bindActionCreators(AuthenticationEffect, dispatch),
    sideBarActions: bindActionCreators(SideBarAction, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Root);

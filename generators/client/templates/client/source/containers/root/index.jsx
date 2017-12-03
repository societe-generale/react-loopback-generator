<% if (isFlow) { %>// @flow<% } %>
import React, { Component } from 'react';
<% if (!isFlow) { %>import PropTypes from 'prop-types';<% } %>
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import { IntlProvider, addLocaleData } from 'react-intl';
<% if (isFlow) { %>// $FlowFixMe<% } %>
import fr from 'react-intl/locale-data/fr';
<% if (isFlow) { %>// $FlowFixMe<% } %>
import en from 'react-intl/locale-data/en';
<% if (isFlow) { %>import type { Node } from 'react';
import type { Dispatch } from 'redux';<% } %>
import HeaderBar from '../../components/header-bar';
import SideBar from '../../components/side-bar';
import HomeView from '../home-view';
import frMessages from '../../locale/locale-fr.json';
import enMessages from '../../locale/locale-en.json';

import * as AuthenticationEffect from '../../effects/authentication';
import * as SideBarAction from '../../actions/side-bar';
import crudRoutes from '../../crud-routes/';
<% if (isFlow) { %>import type { User } from '../../common/user';<% } %>

const locales = {
  fr: frMessages,
  en: enMessages,
};

addLocaleData([...fr, ...en]);<% if (isFlow) { %>

type Sidebar = {
  open: boolean,
};
type Authentication = {
  id: string,
  user: User
} | {};
type Props = {
  languageSelected: string,
  authentication: Authentication,
  authenticationEffects: {
    login: Function,
    logout: Function,
  },
  sideBar: Sidebar,
  sideBarActions: {
    open: Function,
    close: Function,
    toggle: Function,
  },
  children?: Node,
};
type State = {
  language: {
    selected: string,
  },
  authentication?: Authentication,
  'side-bar': Sidebar,
};
<% } %>
export class Root extends Component<% if (isFlow) { %><Props><% } %> {
  componentWillMount() {
    this.props.authenticationEffects.login().catch(() => {
      // To avoid 401 error when page loaded from cache
      window.location.reload(true);
    });
  }

  doLogout() {
    this.props.authenticationEffects.logout();
  }
<% if (isFlow) { %>
  props: Props;<% } %>
  render() {
    if (isEmpty(this.props.authentication)) return <div />;
    return (
      <IntlProvider
        locale={this.props.languageSelected}
        messages={locales[this.props.languageSelected]}
      >
        <div>
          <HeaderBar onOpenSideBar={this.props.sideBarActions.open} />
          <SideBar
            open={this.props.sideBar.open}
            onCloseSideBar={this.props.sideBarActions.close}
            onLogout={this.props.authenticationEffects.logout}
          />
          <Switch>
            <Route path="/" component={HomeView} />
            {crudRoutes.map(route => route)}
          </Switch>
        </div>
      </IntlProvider>
    );
  }
}<% if (!isFlow) { %>

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
};<% } %>

function mapStateToProps(state<% if (isFlow) { %>: State<% } %>) {
  return {
    languageSelected: state.language.selected,
    authentication: state.authentication,
    sideBar: state['side-bar'],
  };
}
<%
let dispatchParam = 'dispatch';
if (isFlow) {
  dispatchParam = 'dispatch: Dispatch<any>';
}%>
function mapDispatchToProps(<%- dispatchParam %>) {
  return {
    authenticationEffects: bindActionCreators(AuthenticationEffect, dispatch),
    sideBarActions: bindActionCreators(SideBarAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);

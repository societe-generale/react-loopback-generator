// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { IntlProvider, addLocaleData } from 'react-intl';
// $FlowFixMe
import fr from 'react-intl/locale-data/fr';
// $FlowFixMe
import en from 'react-intl/locale-data/en';
import HeaderBar from '../../components/header-bar';
import SideBar from '../../components/side-bar';
import frMessages from '../../locale/locale-fr';
import enMessages from '../../locale/locale-en';

import * as AuthenticationEffect from '../../effects/authentication';
import * as SideBarAction from '../../actions/side-bar';
import type { User } from '../../common/user';

const locales = {
  fr: frMessages,
  en: enMessages,
};

addLocaleData([...fr, ...en]);

type Props = {
  languageSelected: string,
  authentication: {
    user: User,
  },
  authenticationEffects: {
    login: Function,
    logout: Function,
  },
  sideBar: {
    open: boolean,
  },
  sideBarActions: {
    open: Function,
    close: Function,
  },
  children?: any,
};

export class Root extends Component<Props> {
  componentWillMount() {
    this.props.authenticationEffects.login().catch(() => {
      // To avoid 401 error when page loaded from cache
      window.location.reload(true);
    });
  }

  doLogout() {
    this.props.authenticationEffects.logout();
  }

  render() {
    if (_.isEmpty(this.props.authentication)) return <div />;
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
          {this.props.children}
        </div>
      </IntlProvider>
    );
  }
}

type State = {
  +language: Object,
  +authentication: {
    user: User,
  },
  +'side-bar': Object,
};

function mapStateToProps(state: State) {
  return {
    languageSelected: state.language.selected,
    authentication: state.authentication,
    sideBar: state['side-bar'],
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {
    authenticationEffects: bindActionCreators(AuthenticationEffect, dispatch),
    sideBarActions: bindActionCreators(SideBarAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);

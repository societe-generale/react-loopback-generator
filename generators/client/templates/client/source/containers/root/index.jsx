import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import HeaderBar from '../../components/header-bar';
import SideBar from '../../components/side-bar';

import * as AuthenticationAction from '../../actions/authentication';
import * as SideBarAction from '../../actions/side-bar';

export class Root extends Component {

  componentWillMount() {
    this.props.authenticationActions.doLogin();
  }

  doLogout() {
    this.props.authenticationActions.doLogout();
  }

  render() {
    if (_.isEmpty(this.props.authentication)) return (<div />);
    return (
      <div>
        <HeaderBar
          onOpenSideBar={this.props.sideBarActions.open}
        />
        <SideBar
          open={this.props.sideBar.open}
          onCloseSideBar={this.props.sideBarActions.close}
          onLogout={this.props.authenticationActions.doLogout}
        />
        {this.props.children}
      </div>
    );
  }

}

Root.propTypes = {
  authentication: PropTypes.shape({
    id: PropTypes.string,
  }),
  authenticationActions: PropTypes.shape({
    doLogin: PropTypes.func.isRequired,
    doLogout: PropTypes.func.isRequired,
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
    authentication: state.authentication,
    sideBar: state['side-bar'],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authenticationActions: bindActionCreators(AuthenticationAction, dispatch),
    sideBarActions: bindActionCreators(SideBarAction, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Root);

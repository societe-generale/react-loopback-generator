import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import HeaderBar from '../../components/header-bar';
import SideBar from '../../components/side-bar';

import * as AuthenticationAction from '../../actions/authentication';
import * as SideBarAction from '../../actions/side-bar';

class Root extends Component {

  constructor(props) {
    super(props);
    this.state = {ready: false};
  }

  componentWillMount() {
    this.props.authenticationActions.doLogin()
      .then(res => {
        this.setState({ready: true})
      });
  }

  doLogout() {
    this.props.authenticationActions.doLogout(this.state.authentication.userId)
  }

  render() {
    if (!this.state.ready) return (<div></div>);
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
    id: PropTypes.string
  }),
  authenticationActions: PropTypes.shape({
    doLogin: PropTypes.func.isRequired,
    doLogout: PropTypes.func.isRequired
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    authentication: state.authentication,
    sideBar: state['side-bar'],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authenticationActions: bindActionCreators(AuthenticationAction, dispatch),
    sideBarActions: bindActionCreators(SideBarAction, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);

import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as AuthenticationAction from '../../actions/authentication';

class HomeView extends Component {

  constructor(props) {
    super(props);
    this.state = {ready: false};
  }

  componentWillMount() {
    this.props.authenticationActions.doLogin()
      .then(_ => this.setState({ready: true}));
  }

  render() {
    if (!this.state.ready) return (<div></div>);
    return (<div>Hello World</div>);
  }

}

HomeView.propTypes = {
  authentication: PropTypes.shape({
    id: PropTypes.string
  }),
  authenticationActions: PropTypes.shape({
    doLogin: PropTypes.func.isRequired
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    authentication: state.authentication,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authenticationActions: bindActionCreators(AuthenticationAction, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView);

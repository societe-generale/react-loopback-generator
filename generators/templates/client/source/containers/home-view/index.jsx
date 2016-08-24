import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import * as AuthenticationAction from '../../actions/authentication';

class HomeView extends Component {

  constructor(props) {
    super(props);
    this.state = {ready: false};
  }

  componentWillMount() {
    this.props.authenticationActions.doLogin()
      .then((resp) => {
        this.setState({ready: true, authentication: resp.payload})
      });
  }

  doLogout() {
    this.props.authenticationActions.doLogout(this.state.authentication.userId)
  }

  render() {
    if (!this.state.ready) return (<div></div>);
    return (
      <div>
        <div>Hello World</div>
        <RaisedButton label="Logout" onTouchTap={this.doLogout.bind(this)} secondary={true}/>
      </div>
    );
  }

}

HomeView.propTypes = {
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

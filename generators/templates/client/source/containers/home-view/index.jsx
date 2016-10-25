import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import HelloCard from '../../components/hello-card';

class HomeView extends Component {

  render() {
    return (
      <div className="container">
        <div className="row center-xs">
          <div className="col-xs-12 col-md-6">
            <HelloCard user={this.props.user} />
          </div>
        </div>
      </div>
    );
  }

}

HomeView.propTypes = {
};

function mapStateToProps(state) {
  return {
    user: state.authentication.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView);

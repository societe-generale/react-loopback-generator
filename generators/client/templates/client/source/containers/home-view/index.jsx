import React, { Component } from 'react';
import { connect } from 'react-redux';

import HelloCard from '../../components/hello-card';

class HomeView extends Component {
  render() {
    const { authentication = {} } = this.props;
    return (
      <div className="container">
        <div className="row center-xs">
          <div className="col-xs-12 col-md-6">
            <HelloCard authentication={authentication} />
          </div>
        </div>
      </div>
    );
  }
}

HomeView.propTypes = HelloCard.propTypes;

function mapStateToProps(state) {
  return {
    authentication: state.authentication,
  };
}

export default connect(
  mapStateToProps,
)(HomeView);

import React, {Component} from 'react'
import {connect} from 'react-redux';

class HomeView extends Component {

  render() {
    return (<div></div>);
  }

}

HomeView.propTypes = {
};

function mapStateToProps() {
  return {}
}

function mapDispatchToProps() {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView);

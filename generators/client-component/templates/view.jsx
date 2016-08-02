import React, {Component, PropType} from 'react';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';

class <%= componentName %> extends Component {

  render() {
    return (<div></div>);
  }

}

<%= componentName %>.propTypes = {
  routing: PropType.object.isRequired,
  routerActions: PropType.shape({
    push: PropType.func.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    routing: state.rounting,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    routerActions: bindActionCreators({push}, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(<%= componentName %>);

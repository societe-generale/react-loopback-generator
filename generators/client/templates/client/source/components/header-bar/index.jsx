import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';

export default class HeaderBar extends Component {
  render() {
    return (
      <AppBar
        onLeftIconButtonTouchTap={this.props.onOpenSideBar}
        title="<%= applicationName %>"
      />
    );
  }
}

HeaderBar.propTypes = {
  onOpenSideBar: PropTypes.func,
};

// @flow
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar/index';

type Props = {
  onOpenSideBar: Function,
};

export default class HeaderBar extends Component<Props> {
  render() {
    return (
      <AppBar onLeftIconButtonTouchTap={this.props.onOpenSideBar} title="<%= applicationName %>" />
    );
  }
}

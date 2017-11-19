// @flow
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar/index';
import Drawer from 'material-ui/Drawer/index';
import { List, ListItem } from 'material-ui/List/index';
import { FormattedMessage } from 'react-intl';

type Props = {
  open: boolean,
  onCloseSideBar: Function,
  onLogout: Function,
};

export default class SideBar extends Component<Props> {
  render() {
    return (
      <Drawer open={this.props.open}>
        <AppBar
          onLeftIconButtonTouchTap={this.props.onCloseSideBar}
          title="<%= applicationName %>"
        />
        <List>
          <ListItem
            onTouchTap={this.props.onLogout}
            primaryText={<FormattedMessage id="authentication.logout" />}
          />
        </List>
      </Drawer>
    );
  }
}

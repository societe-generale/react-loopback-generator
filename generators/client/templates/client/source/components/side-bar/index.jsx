<% if (isFlow) { %>// @flow<% } %>
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
<% if (isFlow) { %>import AppBar from 'material-ui/AppBar/index';
import Drawer from 'material-ui/Drawer/index';
import { List, ListItem } from 'material-ui/List/index';<% } else { %>
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';<% } %>
<% if (isFlow) { %>
type Props = {
  open: boolean,
  onCloseSideBar: Function,
  onLogout: Function,
};<% } %>
export default class SideBar extends Component<% if (isFlow) { %><Props><% } %> {
  <% if (isFlow) { %>props: Props;<% } %>
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
}<% if (!isFlow) { %>

SideBar.propTypes = {
  open: PropTypes.bool,
  onCloseSideBar: PropTypes.func,
  onLogout: PropTypes.func,
};<% } %>

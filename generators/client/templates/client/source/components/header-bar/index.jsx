<% if (isFlow) { %>// @flow<% } %>
import React, { Component } from 'react';
<% if (isFlow) { %>import AppBar from 'material-ui/AppBar/index';<% } else { %>
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';<% } %>
<% if (isFlow) { %>
type Props = {
  onOpenSideBar: Function,
};
<% } %>
export default class HeaderBar extends Component<% if (isFlow) { %><Props><% } %> {
  <% if (isFlow) { %>props: Props;<% } %>
  render() {
    return (
      <AppBar
        onLeftIconButtonTouchTap={this.props.onOpenSideBar}
        title="<%= applicationName %>"
      />
    );
  }
}<% if (!isFlow) { %>

HeaderBar.propTypes = {
  onOpenSideBar: PropTypes.func,
};<% } %>

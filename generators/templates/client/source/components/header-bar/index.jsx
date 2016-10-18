import React from 'react';
import AppBar from 'material-ui/AppBar';

export default props => (
  <AppBar
    onLeftIconButtonTouchTap={props.onOpenSideBar}
    title="<%= applicationName %>"
  />
);

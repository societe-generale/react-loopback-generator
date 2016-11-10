import React from 'react';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';

import Translate from 'react-translate-component';

export default props => (
  <Drawer open={props.open}>
    <AppBar
      onLeftIconButtonTouchTap={props.onCloseSideBar}
      title="<%= applicationName %>"
    />
    <List>
      <ListItem
        onTouchTap={props.onLogout}
        primaryText={<Translate content="authentication.logout" />}
      />
    </List>
  </Drawer>
);

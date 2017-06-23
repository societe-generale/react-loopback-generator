import React from 'react';
import { IndexRoute, Route } from 'react-router';

import RootConnected from './containers/root';
import HomeView from './containers/home-view';

const routes = (
  <Route path="/" component={RootConnected}>
    <IndexRoute component={HomeView} />
  </Route>
);

export default routes;

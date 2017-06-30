import React from 'react';
import { IndexRoute, Route } from 'react-router';

import RootConnected from './containers/root';
import HomeView from './containers/home-view';

import crudRoutes from './crud-routes/';

const routes = (
  <Route path="/" component={RootConnected}>
    <IndexRoute component={HomeView} />
    {crudRoutes.map(route => route)}
  </Route>
);

export default routes;

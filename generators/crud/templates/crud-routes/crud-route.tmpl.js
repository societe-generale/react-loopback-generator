import React from 'react';

import { Route } from 'react-router';

import <%= viewClassName %> from '../containers/<%= entityFileName %>';

const route = (
  <Route path="<%= entityFileName %>" component={<%= viewClassName %>} />
);

export default route;


<% if (isFlow) { %>// @flow
import type { Dispatch } from 'redux';<% } %>
import * as action from '../actions/authentication';
import { request } from '../actions/networking';
import urls from '../constants/url-config';

import fakeuser from './fakeuser';
<%
let dispatchParam = 'dispatch';
if (isFlow) {
  dispatchParam = '(dispatch: Dispatch<any>)';
}
%>
export const login = () => <%- dispatchParam %> =>
  dispatch(() => Promise.resolve(fakeuser)).then(res =>
    dispatch(action.login(res.data)),
  );

export const logout = () => <%- dispatchParam %> =>
  dispatch(request(urls.AUTH, { method: 'DELETE' }))
    .then(() => dispatch(request(urls.AUTH_LOGOUT)))
    .catch(() => {
      dispatch(action.logout());
      window.location = 'logout';
    });

<% if (isFlow) { %>// @flow<% } %>
import Cookies from 'js-cookie';
import fetch from 'isomorphic-fetch';
<% if (isFlow) { %>import type RequestOptions from 'isomorphic-fetch';<% } %>

import cst from '../constants/networking';

export const start = () => ({ type: cst.START });
export const stop = () => ({ type: cst.STOP });
<%
let getRequestOptionsParams = '(options, authentication)';
let requestParams = '(url, options)';
let requestReturnParams = '(dispatch, getState)';
if (isFlow) {
  getRequestOptionsParams = '(options?: RequestOptions, authentication: any)';
  requestParams = '(url: string, options?: RequestOptions)';
  requestReturnParams = '(dispatch: Function, getState: Function)'
}%>
const getRequestOptions = <%= getRequestOptionsParams %> => {
  let headers = {};
  if (
    options &&
    options.method === 'POST' &&
    typeof options.body === 'string'
  ) {
    headers = { 'Content-Type': 'application/json' };
  }
  const requestOptions = {
    credentials: 'same-origin',
    headers,
    ...options,
  };

  Object.keys(requestOptions.headers).forEach(key => {
    if (requestOptions.headers[key] == null) {
      delete requestOptions.headers[key];
    }
  });
  if (authentication) {
    requestOptions.headers.authorization = authentication.id;
  }
  const csrfToken = Cookies.get('XSRF-TOKEN');
  if (csrfToken) {
    requestOptions.headers['XSRF-TOKEN'] = csrfToken;
  }

  return requestOptions;
};

export function request<%= requestParams %> {
  return <%= requestReturnParams %> => {
    const { authentication } = getState();
    const requestOptions = getRequestOptions(options, authentication);

    let status;
    return fetch(url, requestOptions)
      .then(response => {
        status = response.status;
        return status === 204 ? null : response.json();
      })
      .then(response => {
        const result = {
          status,
          data: response,
        };
        if (status >= 200 && status < 300) {
          return result;
        }
        throw new Error(
          response && response.error
            ? response.error.name
            : JSON.stringify(response),
        );
      });
  };
}

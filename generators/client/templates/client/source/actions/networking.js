import Cookies from 'js-cookie';
import fetch from 'isomorphic-fetch';
import { merge } from 'lodash';

import cst from '../constants/networking';

export const start = () => ({ type: cst.START });
export const stop = () => ({ type: cst.STOP });

const getRequestOptions = (options, authentication) => {
  let headers = {};
  if (options && options.method === 'POST' && typeof options.body === 'string') {
    headers = { 'Content-Type': 'application/json' };
  }
  const requestOptions = merge({
    credentials: 'same-origin',
    headers,
  }, options);
  Object.keys(requestOptions.headers).forEach((key) => {
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

export function request(url, options) {
  return (dispatch, getState) => {
    const { authentication } = getState();
    const requestOptions = getRequestOptions(options, authentication);

    let status;
    return fetch(url, requestOptions)
    .then((response) => {
      status = response.status;
      return status === 204 ? null : response.json();
    })
    .then((response) => {
      const result = {
        status,
        data: response,
      };
      if (status >= 200 && status < 300) {
        return result;
      }
      const err = new Error(response.error ? response.error.name : JSON.stringify(response));
      err.data = response;
      throw err;
    });
  };
}

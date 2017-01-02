import fetch from 'isomorphic-fetch';
import { merge } from 'lodash';
import Cookies from 'js-cookie';

import cst from '../constants/networking';

export const start = () => ({ type: cst.START });
export const stop = () => ({ type: cst.STOP });

export function request(url, options) {
  return (dispatch, getState) => {
    const requestOptions = merge({
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }, options);
    Object.keys(requestOptions.headers).forEach((key) => {
      if (requestOptions.headers[key] == null) {
        delete requestOptions.headers[key];
      }
    });
    const { authentication } = getState();
    if (authentication) {
      requestOptions.headers.authorization = authentication.id;
    }
    const csrfToken = Cookies.get('XSRF-TOKEN');
    if (csrfToken) {
      requestOptions.headers['XSRF-TOKEN'] = csrfToken;
    }
    let status;
    return fetch(url, requestOptions)
    .then((response) => {
      status = response.status;
      return status === 204 ? null : response.json();
    })
    .then((response) => {
      var result = {
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

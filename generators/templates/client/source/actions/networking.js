import cst from '../constants/networking';
import fetch from 'isomorphic-fetch';
import {merge} from 'lodash';

export const start = _ => ({type: cst.START});
export const stop = _ => ({type: cst.STOP});

export function request(url, options) {
  return (dispatch, getState) => {
    let requestOptions = merge({
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }, options);
    for (let key in requestOptions.headers) {
      if (requestOptions.headers[key] == null) {
        delete requestOptions.headers[key];
      }
    }
    let {authentication} = getState();
    if (authentication) {
      requestOptions.headers.authorization = authentication.id;
    }
    var status;
    return Promise.resolve(fetch(url, requestOptions))
    .then((response) => {
      status = response.status;
      return status === 204 ? null : response.json();
    })
    .then((response) => {
      var result = {
        status,
        data: response
      };
      if (status >= 200 && status < 300) {
        return result;
      } else {
        let err = new Error(response.error ? response.error.name : JSON.stringify(response));
        err.data = response;
        throw err;
      }
    });
  };
};

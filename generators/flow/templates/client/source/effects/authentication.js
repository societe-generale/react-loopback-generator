// @flow
import * as action from '../actions/authentication';
import { request } from '../actions/networking';
import urls from '../constants/url-config';

import fakeuser from './fakeuser';

export const login = () => (dispatch: Dispatch) =>
  dispatch(() => Promise.resolve(fakeuser)).then(res =>
    dispatch(action.login(res.data)),
  );

export const logout = () => (dispatch: Dispatch) =>
  dispatch(request(urls.AUTH, { method: 'DELETE' }))
    .then(() => dispatch(request(urls.AUTH_LOGOUT)))
    .catch(() => {
      dispatch(action.logout());
      window.location = 'logout';
    });

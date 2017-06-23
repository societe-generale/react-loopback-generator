import * as action from '../actions/authentication';
import { request } from '../actions/networking';
import urls from '../constants/url-config';

import fakeuser from './fakeuser.json';

export const login = () =>
  dispatch =>
    dispatch(() => Promise.resolve(fakeuser))
    .then(res => dispatch(action.login(res.data)));

export const logout = () =>
  dispatch =>
    dispatch(request(urls.AUTH, { method: 'DELETE' }))
      .then(() =>
        dispatch(request(urls.AUTH_LOGOUT)),
      )
      .catch(() => {
        dispatch(action.logout());
        window.location = 'logout';
      });

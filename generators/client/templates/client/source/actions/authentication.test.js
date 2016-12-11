import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as action from './authentication';
import url from '../constants/url-config';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);


describe('Actions authentication', () => {
  it('login should create AUTHENTICATION_LOGIN action', () => {
    expect(action.login('token')).toEqual({
      type: 'AUTHENTICATION_LOGIN',
      payload: 'token',
    });
  });

  it('logout should create AUTHENTICATION_LOGOUT', () => {
    expect(action.logout()).toEqual({
      type: 'AUTHENTICATION_LOGOUT',
    });
  });

  it('should call request and  dispatch AUTHENTICATION_LOGIN', () => {
    url.AUTH = 'http://localhost/api/auth';
    const store = mockStore({});
    const expected = [{ type: 'AUTHENTICATION_LOGIN', payload: { user: 'myUser' } }];
    nock('http://localhost')
      .get('/api/auth')
      .reply(200, { user: 'myUser' });

    return store.dispatch(action.doLogin())
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });
});

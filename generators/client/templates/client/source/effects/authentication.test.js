import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as effect from './authentication';
import url from '../constants/url-config';
import { data } from './fakeuser';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Actions authentication', () => {
  it('should call request and  dispatch AUTHENTICATION_LOGIN', () => {
    url.AUTH = 'http://localhost/api/auth';
    const store = mockStore({});
    const expected = [
      {
        type: 'AUTHENTICATION_LOGIN',
        payload: {
          user: data.user,
        },
      },
    ];
    nock('http://localhost')
      .get('/api/auth')
      .reply(200, { user: 'myUser' });

    return store.dispatch(effect.login()).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});

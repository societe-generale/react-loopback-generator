import expect from 'expect';
import reducer from './authentication';
import * as type from '../constants/authentication.json';

describe('authentication reducer', () => {
  it('should return the initialState', () => {
    expect(
      reducer(null, {}))
      .toEqual(null);
  });

  it('should handle AUTHENTICATION_LOGIN', () => {
    expect(
      reducer(null, {
        type: type.LOGIN,
        payload: 'test',
      })).toEqual(
      'test',
    );
  });

  it('should handle AUTHENTICATION_LOGOUT', () => {
    expect(
      reducer(null, {
        type: type.LOGOUT,
      })).toEqual(
      {},
    );
  });
});

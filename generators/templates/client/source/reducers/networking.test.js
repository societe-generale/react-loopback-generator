import expect from 'expect';

import reducer from './networking';
import constants from '../constants/networking';

describe('reducers/networking', () => {
  describe('initial state', () => {
    it('should return default if unknown action', () => {
      let action = { type: 'NOTHING' };
      let expectedState = 0;
      expect(reducer(undefined, action)).toEqual(expectedState);
    });
  });

  describe('start action ', () => {
    it('should return state to one', () => {
      let action = { type: constants.START};
      let expectedState = 1;

      expect(reducer(undefined, action)).toEqual(expectedState);
    });
  });
  describe('stop action ', () => {
    it('should return state to minus one', () => {
      let action = { type: constants.STOP};
      let expectedState = -1;

      expect(reducer(undefined, action)).toEqual(expectedState);
    });
  });
});

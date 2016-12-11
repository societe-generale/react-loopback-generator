import expect from 'expect';
import reducer from './side-bar';
import constants from '../constants/side-bar';

describe('reducers/side-bar', () => {
  describe('initial state', () => {
    it('should return default if unknown action', () => {
      const action = { type: 'NOTHING' };
      const expectedState = { open: false };
      expect(reducer(undefined, action)).toEqual(expectedState);
    });
  });

  describe('open action ', () => {
    it('should return state open', () => {
      const action = { type: constants.OPEN };
      const expectedState = { open: true };

      expect(reducer(undefined, action)).toEqual(expectedState);
    });
  });
  describe('close action ', () => {
    it('should return state false', () => {
      const action = { type: constants.CLOSE };
      const expectedState = { open: false };
      const initialState = { open: true };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('toggle action ', () => {
    it('should return state opposite to initialState', () => {
      const action = { type: constants.TOGGLE };
      const initialState = {
        open: false,
      };
      const expectedState = { open: true };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });
});

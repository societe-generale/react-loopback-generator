import expect from 'expect';

import reducer from './side-bar';
import constants from '../constants/side-bar';

describe('reducers/side-bar', () => {
  describe('initial state', () => {
    it('should return default if unknown action', () => {
      let action = { type: 'NOTHING' };
      let expectedState = {open:false};
      expect(reducer(undefined, action)).toEqual(expectedState);
    });
  });

  describe('open action ', () => {
    it('should return state open', () => {
      let action = { type: constants.OPEN};
      let expectedState = {open : true};

      expect(reducer(undefined, action)).toEqual(expectedState);
    });
  });
  describe('close action ', () => {
    it('should return state false', () => {
      let action = { type: constants.CLOSE};
      let expectedState = {open : false};
      let initialState = {open:true};
      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('toggle action ', () => {
    it('should return state opposite to initialState', () => {
      let action = { type: constants.TOGGLE};
      let initialState = {
        open:false
      };
      let expectedState = {open:true};

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });
});

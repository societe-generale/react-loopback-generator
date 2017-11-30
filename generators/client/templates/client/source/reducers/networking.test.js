import reducer from './networking';
import constants from '../constants/networking';

describe('reducers/networking', () => {
  describe('initial state', () => {
    it('should return default if unknown action', () => {
      const action = { type: 'NOTHING' };
      const expectedState = 0;
      expect(reducer(undefined, action)).toEqual(expectedState);
    });
  });

  describe('start action ', () => {
    it('should return state to one', () => {
      const action = { type: constants.START };
      const expectedState = 1;

      expect(reducer(undefined, action)).toEqual(expectedState);
    });
  });
  describe('stop action ', () => {
    it('should return state to minus one', () => {
      const action = { type: constants.STOP };
      const expectedState = -1;

      expect(reducer(undefined, action)).toEqual(expectedState);
    });
  });
});

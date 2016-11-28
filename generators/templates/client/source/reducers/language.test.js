import expect from 'expect';

import reducer from './language';
import constants from '../constants/language';

describe('reducers/language', () => {
  describe('initial state', () => {
    it('should return default if unknown action', () => {
      let action = { type: 'NOTHING' };
      let expectedState = {
        available: [
          { key: 'en', label: 'English' },
          { key: 'fr', label: 'Français' },
        ],
        selected: 'en',
      };
      expect(reducer(undefined, action)).toEqual(expectedState);
    });
  });

  describe('changing language', () => {
    it('should return the new state with the selected lang', () => {
      let initialState = {
        available: [
          { key: 'en', label: 'English' },
          { key: 'fr', label: 'Français' },
        ],
        selected: 'en',
      };
      let action = { type: constants.SELECT, lang: 'fr' };
      let expectedState = {
        available: [
          { key: 'en', label: 'English' },
          { key: 'fr', label: 'Français' },
        ],
        selected: 'fr',
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });
});

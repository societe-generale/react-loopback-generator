import reducer from './language';
import constants from '../constants/language';

describe('reducers/language', () => {
  describe('initial state', () => {
    it('should return default if unknown action', () => {
      const action = { type: 'NOTHING' };
      const expectedState = {
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
      const initialState = {
        available: [
          { key: 'en', label: 'English' },
          { key: 'fr', label: 'Français' },
        ],
        selected: 'en',
      };
      const action = { type: constants.SELECT, lang: 'fr' };
      const expectedState = {
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

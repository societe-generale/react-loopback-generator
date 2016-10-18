import expect from 'expect'

import reducer from './language'
import * as actions from '../actions/language';
import constants from '../constants/language';

describe('reducers/language', () => {

  describe('initial state', () => {

    it('should return default if unknown action', () => {
      var initialState = undefined;
      var action = {type: 'NOTHING'};
      var expectedState = {
        available: [
          {key: 'en', label: 'English'},
          {key: 'fr', label: 'Français'}
        ],
        selected: 'en'
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

  });

  describe('changing language', () => {

    it('should return the new state with the selected lang', () => {
      var initialState = {
        available: [
          {key: 'en', label: 'English'},
          {key: 'fr', label: 'Français'}
        ],
        selected: 'en'
      };
      var action = {type: constants.SELECT, lang: 'fr'};
      var expectedState = {
        available: [
          {key: 'en', label: 'English'},
          {key: 'fr', label: 'Français'}
        ],
        selected: 'fr'
      };
      expect(reducer(initialState, action)).toEqual(expectedState);
    });

  });

});

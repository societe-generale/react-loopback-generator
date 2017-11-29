import action from './language';

describe('Actions language', () => {
  it('lang should create LANGUAGE_SELECT action', () => {
    expect(action('en')).toEqual({
      type: 'LANGUAGE_SELECT',
      lang: 'en',
    });
  });
});

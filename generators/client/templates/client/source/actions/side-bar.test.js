import expect from 'expect';

import * as action from './side-bar';

describe('Actions side-bar', () => {
  it('open should create SIDEBAR_OPEN action', () => {
    expect(action.open()).toEqual({
      type: 'SIDEBAR_OPEN',
    });
  });
  it('close should create SIDEBAR_CLOSE action', () => {
    expect(action.close()).toEqual({
      type: 'SIDEBAR_CLOSE',
    });
  });
  it('toggle should create SIDEBAR_TOGGLE action', () => {
    expect(action.toggle()).toEqual({
      type: 'SIDEBAR_TOGGLE',
    });
  });
});

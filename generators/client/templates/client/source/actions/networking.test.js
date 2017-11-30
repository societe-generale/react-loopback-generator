import * as action from './networking';

describe('Actions networking', () => {
  it('networking should create NETWORKING_START action', () => {
    expect(action.start()).toEqual({
      type: 'NETWORKING_START',
    });
  });

  it('networking should create NETWORKING_STOP action', () => {
    expect(action.stop()).toEqual({
      type: 'NETWORKING_STOP',
    });
  });
});

import expect from 'expect';
import ModelReducer from './model-reducer';
import * as type from '../constants/model';

var modelReducer;
var action = { model: 'fakeModel' };
const INITIAL_STATE = {
  list: {
    loading: false,
    data: [],
    count: 0,
    error: null,
  },
  item: {
    loading: false,
    data: {},
    error: null,
  },
  save: {
    loading: false,
    data: null,
    error: null,
  },
  delete: {
    loading: false,
    data: null,
    error: null,
  },
};

describe('model reducer', () => {
  beforeEach(() => { // eslint-disable-line no-undef
    modelReducer = new ModelReducer('fakeModel');
  });

  it('should return the initialState', () => {
    expect(modelReducer.reducer(undefined, {}))
    .toEqual(INITIAL_STATE);
  });

  it('should return the initialState merged with the customInitialState', () => {
    modelReducer = new ModelReducer('fakeName', { someData: 'someValue' });
    expect(modelReducer.reducer(undefined, {}))
    .toEqual({ ...INITIAL_STATE, someData: 'someValue' });
  });

  it('should return the initialState if action type is not handled', () => {
    expect(modelReducer.reducer(undefined, { ...action, type: 'fakeType' }))
    .toEqual(INITIAL_STATE);
  });

  it('shoud handle LIST_REQUEST', () => {
    expect(modelReducer.reducer(undefined, { ...action, type: type.LIST_REQUEST }))
    .toEqual({
      ...INITIAL_STATE,
      list: {
        loading: true,
        data: [],
        count: 0,
        error: null,
      },
    });
  });

  it('shoud handle LIST_SUCCESS', () => {
    expect(modelReducer.reducer(undefined, { ...action, type: type.LIST_SUCCESS, payload: ['fakeListElement'] }))
    .toEqual({
      ...INITIAL_STATE,
      list: {
        loading: false,
        data: ['fakeListElement'],
        count: 0,
        error: null,
      },
    });
  });

  it('should handle LIST_ERROR', () => {
    expect(modelReducer.reducer(undefined, { ...action, type: type.LIST_ERROR, payload: 'someError' }))
    .toEqual({
      ...INITIAL_STATE,
      list: {
        loading: false,
        data: [],
        count: 0,
        error: 'someError',
      },
    });
  });

  it('should handle COUNT_SUCCESS', () => {
    expect(modelReducer.reducer(undefined, { ...action, type: type.COUNT_SUCCESS, payload: 42 }))
    .toEqual({
      ...INITIAL_STATE,
      list: {
        loading: false,
        data: [],
        count: 42,
        error: null,
      },
    });
  });

  it('should handle ITEM_REQUEST', () => {
    expect(modelReducer.reducer(undefined, { ...action, type: type.ITEM_REQUEST }))
    .toEqual({
      ...INITIAL_STATE,
      item: {
        loading: true,
        data: {},
      },
    });
  });

  it('should handle ITEM_SUCCESS', () => {
    expect(modelReducer.reducer(undefined, { ...action, type: type.ITEM_SUCCESS, payload: 'someItem' }))
    .toEqual({
      ...INITIAL_STATE,
      item: {
        loading: false,
        data: 'someItem',
        error: null,
      },
    });
  });

  it('should handle ITEM_ERROR', () => {
    expect(modelReducer.reducer(undefined, { ...action, type: type.ITEM_ERROR, payload: 'itemError' }))
    .toEqual({
      ...INITIAL_STATE,
      item: {
        loading: false,
        data: {},
        error: 'itemError',
      },
    });
  });

  it('should handle SAVE_REQUEST', () => {
    expect(modelReducer.reducer(undefined, { ...action, type: type.SAVE_REQUEST }))
    .toEqual({
      ...INITIAL_STATE,
      save: {
        loading: true,
        data: null,
        error: null,
      },
    });
  });

  it('should handle SAVE_SUCCESS', () => {
    expect(modelReducer.reducer(undefined, { ...action, type: type.SAVE_SUCCESS, payload: { id: 51 } }))
    .toEqual({
      ...INITIAL_STATE,
      save: {
        loading: false,
        data: { id: 51 },
        error: null,
      },
    });
  });

  it('should handle SAVE_ERROR', () => {
    expect(modelReducer.reducer(undefined, { ...action, type: type.SAVE_ERROR, payload: 'saveError' }))
    .toEqual({
      ...INITIAL_STATE,
      save: {
        loading: false,
        data: null,
        error: 'saveError',
      },
    });
  });

  it('should handle DELETE_REQUEST', () => {
    expect(modelReducer.reducer(undefined, { ...action, type: type.DELETE_REQUEST }))
    .toEqual({
      ...INITIAL_STATE,
      delete: {
        loading: true,
        data: null,
        error: null,
      },
    });
  });

  it('should handle DELETE_SUCCESS', () => {
    expect(modelReducer.reducer(undefined, { ...action, type: type.DELETE_SUCCESS, payload: { id: 2 } }))
    .toEqual({
      ...INITIAL_STATE,
      delete: {
        loading: false,
        data: { id: 2 },
        error: null,
      },
    });
  });

  it('should handle DELETE_ERROR', () => {
    expect(modelReducer.reducer(undefined, { ...action, type: type.DELETE_ERROR, payload: 'deleteError' }))
    .toEqual({
      ...INITIAL_STATE,
      delete: {
        loading: false,
        data: null,
        error: 'deleteError',
      },
    });
  });
});

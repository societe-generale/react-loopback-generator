import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { stringify } from 'qs';
import sinon from 'sinon';

import url from '../constants/url-config';
import ModelEffect from './model-effect';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

url.BASE_API = 'http://localhost/api';

const fakeModelEffect = new ModelEffect('fakeName', 'fake-uri');
const params = {
  value: 'fakeValue',
  list: ['fakeId1', 'fakeId2'],
  object: {
    attribute: 'otherFakeValue',
  },
};
const stringifiedParams = stringify(params, { arrayFormat: 'repeat', encode: false });

describe('model effect', () => {
  describe('find', () => {
    it('should dispatch list request error if method is specified', () => {
      const fakeDispatchError = () => sinon.stub();
      fakeModelEffect.setDispatchListError(fakeDispatchError);

      nock('http://localhost')
      .get('/api/fake-uri/')
      .replyWithError({ message: 'server is down', code: 500 });

      const store = mockStore({});
      return store.dispatch(fakeModelEffect.find())
      .then(() => {
        expect(store.getActions()).toEqual([
          { model: 'fakeName', type: 'MODEL_LIST_REQUEST' },
          { model: 'fakeName', payload: 'request to http://localhost/api/fake-uri/ failed, reason: server is down', type: 'MODEL_LIST_ERROR' },
        ]);
        expect(fakeDispatchError.calledOnce);
      });
    });

    it('should dispatch list actions', () => {
      nock('http://localhost')
      .get('/api/fake-uri/')
      .reply(200, { results: ['someData'] });

      const store = mockStore({});
      return store.dispatch(fakeModelEffect.find())
      .then(() => {
        expect(store.getActions()).toEqual([
          { model: 'fakeName', type: 'MODEL_LIST_REQUEST' },
          { model: 'fakeName', payload: { results: ['someData'] }, type: 'MODEL_LIST_SUCCESS' },
        ]);
      });
    });

    it('should request find with params', () => {
      nock('http://localhost')
      .get(`/api/fake-uri?${stringifiedParams}`)
      .reply(200, { results: ['someData'] });

      const store = mockStore({});
      return store.dispatch(fakeModelEffect.find(params))
      .then(() => {
        expect(store.getActions()).toEqual([
          { model: 'fakeName', type: 'MODEL_LIST_REQUEST' },
          { model: 'fakeName', payload: { results: ['someData'] }, type: 'MODEL_LIST_SUCCESS' },
        ]);
      });
    });
  });

  describe('count', () => {
    it('should dispatch count request error if method is specified', () => {
      const fakeDispatchError = () => sinon.stub();
      fakeModelEffect.setDispatchCountError(fakeDispatchError);

      nock('http://localhost')
      .get('/api/fake-uri/count/')
      .replyWithError({ message: 'server is down', code: 500 });

      const store = mockStore({});
      return store.dispatch(fakeModelEffect.count())
      .then(() => {
        expect(store.getActions()).toEqual([]);
        expect(fakeDispatchError.calledOnce);
      });
    });

    it('should dispatch count actions', () => {
      nock('http://localhost')
      .get('/api/fake-uri/count/')
      .reply(200, { count: 1 });

      const store = mockStore({});
      return store.dispatch(fakeModelEffect.count())
      .then(() => {
        expect(store.getActions()).toEqual([
          { model: 'fakeName', payload: 1, type: 'MODEL_COUNT_SUCCESS' },
        ]);
      });
    });

    it('should request count with params', () => {
      nock('http://localhost')
      .get(`/api/fake-uri/count?${stringifiedParams}`)
      .reply(200, { count: 1 });

      const store = mockStore({});
      return store.dispatch(fakeModelEffect.count(params))
      .then(() => {
        expect(store.getActions()).toEqual([
          { model: 'fakeName', payload: 1, type: 'MODEL_COUNT_SUCCESS' },
        ]);
      });
    });
  });

  describe('findOne', () => {
    it('should dispatch item request error if method is specified', () => {
      const fakeDispatchError = () => sinon.stub();
      fakeModelEffect.setDispatchItemError(fakeDispatchError);

      nock('http://localhost')
      .get('/api/fake-uri/findOne/')
      .replyWithError({ message: 'server is down', code: 500 });

      const store = mockStore({});
      return store.dispatch(fakeModelEffect.findOne())
      .then(() => {
        expect(store.getActions()).toEqual([
          { model: 'fakeName', type: 'MODEL_ITEM_REQUEST' },
          { model: 'fakeName', payload: 'request to http://localhost/api/fake-uri/findOne/ failed, reason: server is down', type: 'MODEL_ITEM_ERROR' },
        ]);
        expect(fakeDispatchError.calledOnce);
      });
    });

    it('should dispatch item actions', () => {
      nock('http://localhost')
      .get('/api/fake-uri/findOne/')
      .reply(200, { item: 'fakeItem' });

      const store = mockStore({});
      return store.dispatch(fakeModelEffect.findOne())
      .then(() => {
        expect(store.getActions()).toEqual([
          { model: 'fakeName', type: 'MODEL_ITEM_REQUEST' },
          { model: 'fakeName', payload: { item: 'fakeItem' }, type: 'MODEL_ITEM_SUCCESS' },
        ]);
      });
    });

    it('should request item with params', () => {
      nock('http://localhost')
      .get(`/api/fake-uri/findOne?${stringifiedParams}`)
      .reply(200, { item: 'fakeItem' });

      const store = mockStore({});
      return store.dispatch(fakeModelEffect.findOne(params))
      .then(() => {
        expect(store.getActions()).toEqual([
          { model: 'fakeName', type: 'MODEL_ITEM_REQUEST' },
          { model: 'fakeName', payload: { item: 'fakeItem' }, type: 'MODEL_ITEM_SUCCESS' },
        ]);
      });
    });
  });

  describe('save', () => {
    it('should dispatch save request error if method is specified', () => {
      const fakeDispatchError = () => sinon.stub();
      fakeModelEffect.setDispatchSaveError(fakeDispatchError);

      nock('http://localhost')
      .post('/api/fake-uri')
      .replyWithError({ message: 'server is down', code: 500 });

      const store = mockStore({});
      return store.dispatch(fakeModelEffect.save({}))
      .then(() => {
        expect(store.getActions()).toEqual([
          { model: 'fakeName', type: 'MODEL_SAVE_REQUEST' },
          { model: 'fakeName', payload: 'request to http://localhost/api/fake-uri failed, reason: server is down', type: 'MODEL_SAVE_ERROR' },
        ]);
        expect(fakeDispatchError.calledOnce);
      });
    });

    it('should dispatch save actions for creation', () => {
      const instanceToSave = {
        name: 'bobby',
      };
      nock('http://localhost')
      .post('/api/fake-uri')
      .reply(200, { ...instanceToSave, lastSaveDate: 'today' });

      const store = mockStore({});
      return store.dispatch(fakeModelEffect.save(instanceToSave))
      .then(() => {
        expect(store.getActions()).toEqual([
          { model: 'fakeName', type: 'MODEL_SAVE_REQUEST' },
          { model: 'fakeName', payload: { lastSaveDate: 'today', name: 'bobby' }, type: 'MODEL_SAVE_SUCCESS' },
        ]);
      });
    });

    it('should dispatch save actions for update', () => {
      const instanceToSave = {
        id: 42,
        name: 'bobby',
      };
      nock('http://localhost')
      .post('/api/fake-uri/42')
      .reply(200, { ...instanceToSave, lastSaveDate: 'today' });

      const store = mockStore({});
      return store.dispatch(fakeModelEffect.save(instanceToSave))
      .then(() => {
        expect(store.getActions()).toEqual([
          { model: 'fakeName', type: 'MODEL_SAVE_REQUEST' },
          { model: 'fakeName', payload: { id: 42, lastSaveDate: 'today', name: 'bobby' }, type: 'MODEL_SAVE_SUCCESS' },
        ]);
      });
    });

    it('should dispatch custom save action if specified', () => {
      fakeModelEffect.dispatchSaveSuccess = sinon.stub();
      const instanceToSave = {
        name: 'bobby',
      };
      nock('http://localhost')
      .post('/api/fake-uri')
      .reply(200, { ...instanceToSave, lastSaveDate: 'today' });

      const store = mockStore({});
      return store.dispatch(fakeModelEffect.save(instanceToSave))
      .then(() => {
        expect(store.getActions()).toEqual([
          { model: 'fakeName', type: 'MODEL_SAVE_REQUEST' },
          { model: 'fakeName', payload: { lastSaveDate: 'today', name: 'bobby' }, type: 'MODEL_SAVE_SUCCESS' },
        ]);
        expect(fakeModelEffect.dispatchSaveSuccess.calledOnce);
      });
    });
  });

  describe('delete', () => {
    it('should dispatch delete request error if method is specified', () => {
      const fakeDispatchError = () => sinon.stub();
      fakeModelEffect.setDispatchDeleteError(fakeDispatchError);

      nock('http://localhost')
      .delete('/api/fake-uri/51')
      .replyWithError({ message: 'server is down', code: 500 });

      const store = mockStore({});
      return store.dispatch(fakeModelEffect.delete(51))
      .then(() => {
        expect(store.getActions()).toEqual([
          { model: 'fakeName', type: 'MODEL_DELETE_REQUEST' },
          { model: 'fakeName', payload: 'request to http://localhost/api/fake-uri/51 failed, reason: server is down', type: 'MODEL_DELETE_ERROR' },
        ]);
        expect(fakeDispatchError.calledOnce);
      });
    });

    it('should dispatch delete actions', () => {
      nock('http://localhost')
      .delete('/api/fake-uri/51')
      .reply(200, { name: 'deleted' });

      const store = mockStore({});
      return store.dispatch(fakeModelEffect.delete(51))
      .then(() => {
        expect(store.getActions()).toEqual([
          { model: 'fakeName', type: 'MODEL_DELETE_REQUEST' },
          { model: 'fakeName', payload: { name: 'deleted' }, type: 'MODEL_DELETE_SUCCESS' },
        ]);
      });
    });

    it('should dispatch custom delete action if specified', () => {
      fakeModelEffect.dispatchDeleteSuccess = sinon.stub();

      nock('http://localhost')
      .delete('/api/fake-uri/51')
      .reply(200, { name: 'deleted' });

      const store = mockStore({});
      return store.dispatch(fakeModelEffect.delete(51))
      .then(() => {
        expect(store.getActions()).toEqual([
          { model: 'fakeName', type: 'MODEL_DELETE_REQUEST' },
          { model: 'fakeName', payload: { name: 'deleted' }, type: 'MODEL_DELETE_SUCCESS' },
        ]);
        expect(fakeModelEffect.dispatchDeleteSuccess.calledOnce);
      });
    });
  });
});

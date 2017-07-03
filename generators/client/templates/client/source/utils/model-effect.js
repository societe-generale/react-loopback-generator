import { stringify } from 'qs';
import { request } from '../actions/networking';
import cst from '../constants/model';
import { BASE_API } from '../constants/url-config';

export const listRequest = modelName => ({
  type: cst.LIST_REQUEST,
  model: modelName,
});
export const updateList = (model, list) => ({
  type: cst.LIST_SUCCESS,
  model,
  payload: list,
});
export const listError = (model, error) => ({
  type: cst.LIST_ERROR,
  model,
  payload: error,
});

export const updateCount = (model, count) => ({
  type: cst.COUNT_SUCCESS,
  model,
  payload: count,
});

export const itemRequest = model => ({
  type: cst.ITEM_REQUEST,
  model,
});
export const updateItem = (model, item) => ({
  type: cst.ITEM_SUCCESS,
  model,
  payload: item,
});
export const itemError = (model, error) => ({
  type: cst.ITEM_ERROR,
  model,
  payload: error,
});

export const saveRequest = model => ({
  type: cst.SAVE_REQUEST,
  model,
});
export const storeLastSaved = (model, lastSaved) => ({
  type: cst.SAVE_SUCCESS,
  model,
  payload: lastSaved,
});
export const saveError = (model, error) => ({
  type: cst.SAVE_ERROR,
  model,
  payload: error,
});

export const deleteRequest = model => ({
  type: cst.DELETE_REQUEST,
  model,
});
export const storeLastDeleted = (model, lastDeleted) => ({
  type: cst.DELETE_SUCCESS,
  model,
  payload: lastDeleted,
});
export const deleteError = (model, error) => ({
  type: cst.DELETE_ERROR,
  model,
  payload: error,
});

export default class ModelEffect {
  constructor(name, uri) {
    this.name = name;
    this.uri = uri;
  }

  setDispatchListError(dispatchListError) {
    this.dispatchListError = dispatchListError;
  }
  setDispatchCountError(dispatchCountError) {
    this.dispatchCountError = dispatchCountError;
  }
  setDispatchItemError(dispatchItemError) {
    this.dispatchItemError = dispatchItemError;
  }
  setDispatchSaveError(dispatchSaveError) {
    this.dispatchSaveError = dispatchSaveError;
  }
  setDispatchDeleteError(dispatchDeleteError) {
    this.dispatchDeleteError = dispatchDeleteError;
  }

  getFindUrl(params, isCount) {
    const url = [];
    url.push(`${BASE_API}/${this.uri}`);
    if (isCount) {
      url.push('/count');
    }
    if (params) {
      url.push('?', stringify(params, { arrayFormat: 'repeat', encode: false }));
    } else {
      url.push('/');
    }
    return url.join('');
  }

  getFindOneUrl(params) {
    const url = [];
    url.push(`${BASE_API}/${this.uri}/findOne`);
    if (params) {
      url.push('?', stringify(params, { arrayFormat: 'repeat', encode: false }));
    } else {
      url.push('/');
    }
    return url.join('');
  }

  getDeleteByIdUrl(id) {
    return `${BASE_API}/${this.uri}/${id}`;
  }

  find(params) {
    return (dispatch) => {
      dispatch(listRequest(this.name));
      return dispatch(request(this.getFindUrl(params)))
        .then(response => dispatch(updateList(this.name, response.data)))
        .catch((error) => {
          dispatch(listError(this.name, error.message));
          if (this.dispatchListError) {
            dispatch(this.dispatchListError(error.message));
          }
        });
    };
  }

  findOne(params) {
    return (dispatch) => {
      dispatch(itemRequest(this.name));
      return dispatch(request(this.getFindOneUrl(params)))
        .then(response => dispatch(updateItem(this.name, response.data)))
        .catch((error) => {
          dispatch(itemError(this.name, error.message));
          if (this.dispatchItemError) {
            dispatch(this.dispatchItemError(error.message));
          }
        });
    };
  }

  count(params) {
    return dispatch =>
      dispatch(request(this.getFindUrl(params, true)))
      .then(response => dispatch(updateCount(this.name, response.data.count)))
      .catch((error) => {
        if (this.dispatchCountError) {
          dispatch(this.dispatchCountError(error.message));
        }
      });
  }

  save(instance) {
    var url = `${BASE_API}/${this.uri}`;
    return (dispatch) => {
      if (instance.id) url += `/${instance.id}`;
      dispatch(saveRequest(this.name));
      return dispatch(request(url, { method: 'POST', body: JSON.stringify(instance) }))
      .then((response) => {
        dispatch(storeLastSaved(this.name, response.data));
        if (this.dispatchSaveSuccess) {
          return this.dispatchSaveSuccess(dispatch);
        }
      })
      .catch((error) => {
        dispatch(saveError(this.name, error.message));
        if (this.dispatchSaveError) {
          return this.dispatchSaveError(dispatch, error.message);
        }
      });
    };
  }

  delete(id) {
    return (dispatch) => {
      dispatch(deleteRequest(this.name));
      return dispatch(request(this.getDeleteByIdUrl(id), { method: 'DELETE' }))
      .then((response) => {
        dispatch(storeLastDeleted(this.name, response.data));
        if (this.dispatchDeleteSuccess) {
          return this.dispatchDeleteSuccess(dispatch);
        }
      })
      .catch((error) => {
        dispatch(deleteError(this.name, error.message));
        if (this.dispatchDeleteError) {
          return this.dispatchDeleteError(dispatch, error);
        }
      });
    };
  }

}

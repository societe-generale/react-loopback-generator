import { initialize, reset } from 'redux-form';

import cst from '../../constants/models/<%= constantFileName %>.json';
import notificationCst from '../../constants/notification.json';

import { request, getUrl } from '../networking';

export default {
  find(params) {
    return dispatch => {
      dispatch(this.findRequest());
      return dispatch(request(getUrl('<%= apiUrl %>', params)))
        .then(response => {
          dispatch(this.findSuccess(response.data));
        })
        .catch(err => {
          dispatch(this.findError(err));
        });
    };
  },
  findOne(idToFind) {
    return dispatch => {
      dispatch(request(`<%= apiUrl %>/${idToFind}`))
        .then(response => {
          const { data } = response;
          dispatch(initialize('model_form', data));
        })
        .catch(() => {
          dispatch(this.notifyError('notification.error.not_found'));
        });
    };
  },
  create(params) {
    return dispatch =>
      dispatch(
        request('<%= apiUrl %>', {
          method: 'POST',
          body: JSON.stringify(params),
        }),
      )
        .then(() => {
          dispatch(reset('model_form'));
          dispatch(this.notifySuccess('notification.create.success'));
        })
        .catch(() => {
          dispatch(this.notifyError('notification.create.error'));
        });
  },
  edit(params, id) {
    return dispatch =>
      dispatch(
        request(`<%= apiUrl %>/${id}/replace`, {
          method: 'POST',
          body: JSON.stringify(params),
        }),
      )
        .then(() => {
          dispatch(this.notifySuccess('notification.edit.success'));
        })
        .catch(() => {
          dispatch(this.notifyError('notification.edit.error'));
        });
  },
  delete(id, modelKeyId) {
    return dispatch =>
      dispatch(
        request(`<%= apiUrl %>/${id}`, { method: 'DELETE' })
      )
        .then(() => {
          dispatch(this.deleteSuccess(id, modelKeyId));
          dispatch(this.notifySuccess('notification.delete.success'));
        })
        .catch(() => {
          dispatch(this.notifyError('notification.delete.error'));
        });
  },
  findRequest() {
    return {
      type: cst.FIND_REQUEST,
    };
  },
  findSuccess(data) {
    return {
      type: cst.FIND_SUCCESS,
      payload: data,
    };
  },
  findError(error) {
    return {
      type: cst.FIND_ERROR,
      payload: error,
    };
  },
  deleteSuccess(idToDelete, modelKeyId) {
    return {
      type: cst.DELETE_ELEMENT,
      payload: { id: idToDelete, modelKeyId },
    };
  },
  notifySuccess(message) {
    return {
      type: notificationCst.OPEN,
      payload: { message, notificationType: notificationCst.success },
    };
  },
  notifyError(message) {
    return {
      type: notificationCst.OPEN,
      payload: { message, notificationType: notificationCst.error },
    };
  },
  export(authentication) {
    return () => {
      window.location = `<%= apiUrl %>/export?access_token=${authentication.id}`;
    };
  },
};

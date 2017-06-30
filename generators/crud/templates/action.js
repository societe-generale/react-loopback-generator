import cst from '../constants/<%= constantFileName %>';
import { request } from './networking';

const <%= `${createActionName}Success` %> = payload => ({ type: cst.<%= `CREATE_${actionReduxName}_SUCCESS` %>, payload });
const <%= `${createActionName}Error` %> = payload => ({ type: cst.<%= `CREATE_${actionReduxName}_ERROR` %>, payload });

const <%= `${getActionName}Success` %> = payload => ({ type: cst.<%= `GET_${actionReduxName}_SUCCESS` %>, payload });
const <%= `${getActionName}Error` %> = payload => ({ type: cst.<%= `GET_${actionReduxName}_ERROR` %>, payload });

export const <%= createActionName %> = (data) => {
  return dispatch => dispatch(request(
    '<%= apiUrl %>',
    { method: 'POST', body: JSON.stringify(data) },
  ))
  .then(res => dispatch(<%= `${createActionName}Success` %>(res.data)))
  .catch(error => dispatch(<%= `${createActionName}Error` %>(error)));
}

export const <%= getActionName %> = () => {
  return dispatch => dispatch(request('<%= apiUrl %>'))
  .then(res => dispatch(<%= `${getActionName}Success` %>(res.data)))
  .catch(error => dispatch(<%= `${getActionName}Error` %>(error)));
}

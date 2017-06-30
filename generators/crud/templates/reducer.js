import * as cst from '../constants/<%= constantFileName %>';

export default function reducer(state = [], action) {
  switch (action.type) {
    case cst.GET_<%= actionReduxName %>_SUCCESS: {
      return action.payload;
    }
    case cst.CREATE_<%= actionReduxName %>_SUCCESS: {
      return [...state, ...action.payload];
    }
    default:
      return state;
  }
}

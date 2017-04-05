import cst from '../constants/authentication';

export default function reducer(state = null, action) {
  switch (action.type) {
    case cst.LOGIN:
      return action.payload;
    case cst.LOGOUT:
      return {};
    default:
      return state;
  }
}

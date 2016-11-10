import cst from '../constants/networking';

export default function reducer(state = 0, action) {
  switch (action.type) {
    case cst.START:
      return state + 1;
    case cst.STOP:
      return state - 1;
    default:
      return state;
  }
}

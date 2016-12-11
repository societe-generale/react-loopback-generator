import cst from '../constants/side-bar';

export const initialState = { open: false };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case cst.OPEN:
      return {
        ...state,
        open: true,
      };
    case cst.CLOSE:
      return {
        ...state,
        open: false,
      };
    case cst.TOGGLE:
      return {
        ...state,
        open: !state.open,
      };
    default:
      return state;
  }
}

import cst from '../../constants/models/<%= constantFileName %>.json';

const initialState = {
  loading: false,
  isLoaded: false,
  error: null,
  list: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case cst.FIND_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case cst.FIND_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isLoaded: true,
        list: action.payload,
      };
    case cst.FIND_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case cst.DELETE_ELEMENT:
      return {
        ...state,
        list: state.list.filter(
          el => el[action.payload.modelKeyId] !== action.payload.id,
        ),
      };
    default:
      return state;
  }
}

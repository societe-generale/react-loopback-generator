import * as type from '../constants/model';

export default class ModelReducer {

  constructor(name, customInitialState) {
    this.name = name;
    this.initialState = {
      ...customInitialState,
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
  }

  reducer(state = this.initialState, action) {
    if (action.model !== this.name) {
      return state;
    }
    switch (action.type) {
      case type.LIST_REQUEST:
        return {
          ...state,
          list: {
            loading: true,
            data: [],
            count: 0,
            error: null,
          },
        };
      case type.LIST_SUCCESS: {
        const list = {
          ...state.list,
        };
        list.data = action.payload;
        list.loading = false;
        return {
          ...state,
          list,
        };
      }
      case type.LIST_ERROR:
        return {
          ...state,
          list: {
            loading: false,
            data: [],
            count: 0,
            error: action.payload,
          },
        };
      case type.COUNT_SUCCESS: {
        const list = {
          ...state.list,
        };
        list.count = action.payload;
        return {
          ...state,
          list,
        };
      }
      case type.ITEM_REQUEST:
        return {
          ...state,
          item: {
            loading: true,
            data: {},
          },
        };
      case type.ITEM_SUCCESS:
        return {
          ...state,
          item: {
            loading: false,
            data: action.payload,
            error: null,
          },
        };
      case type.ITEM_ERROR:
        return {
          ...state,
          item: {
            loading: false,
            data: {},
            error: action.payload,
          },
        };

      case type.SAVE_REQUEST:
        return {
          ...state,
          save: {
            loading: true,
            data: null,
            error: null,
          },
        };
      case type.SAVE_SUCCESS:
        return {
          ...state,
          save: {
            loading: false,
            data: action.payload,
            error: null,
          },
        };
      case type.SAVE_ERROR:
        return {
          ...state,
          save: {
            loading: false,
            data: null,
            error: action.payload,
          },
        };
      case type.DELETE_REQUEST:
        return {
          ...state,
          delete: {
            loading: true,
            data: null,
            error: null,
          },
        };
      case type.DELETE_SUCCESS:
        return {
          ...state,
          delete: {
            loading: false,
            data: action.payload,
            error: null,
          },
        };
      case type.DELETE_ERROR:
        return {
          ...state,
          delete: {
            loading: false,
            data: null,
            error: action.payload,
          },
        };
      default:
        return state;
    }
  }

}

import cst from '../contants/<%= reducerFilename %>';

const initialState = {
  list: []
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    // HERE IS AN EXAMPLE
    case cst.PUSH:
      return {list: [...state.list, action.payload]};
    //
    default:
      return state;
  }
};

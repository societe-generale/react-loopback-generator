import * as cst from '../contants/<%= reducerFilename %>';

export const pop = function(data) {
  return {type: cst.POP, data};
};

export const push = function(data) {
  return {type: cst.PUSH, data};
};

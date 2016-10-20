import cst from '../constants/<%= reducerFilename %>';

export const pop = (data) => ({type: cst.POP, payload: data});

export const push = (data) => ({type: cst.PUSH, payload: data});

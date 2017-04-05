import cst from '../constants/authentication';

export const login = token => ({ type: cst.LOGIN, payload: token });
export const logout = () => ({ type: cst.LOGOUT });

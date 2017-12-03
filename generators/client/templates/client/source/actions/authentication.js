<% if (isFlow) { %>// @flow<% } %>
import cst from '../constants/authentication';
<%
let tokenParam = 'token';
if (isFlow) {
  tokenParam = '(token: string)';
}%>
export const login = <%= tokenParam %> => ({ type: cst.LOGIN, payload: token });
export const logout = () => ({ type: cst.LOGOUT });

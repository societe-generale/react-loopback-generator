<% if (isFlow) { %>// @flow<% } %>
import types from '../constants/language';
<%
let langParam = 'lang';
if (isFlow) {
  langParam = '(lang: string)';
}%>
export default <%= langParam %> => ({ type: types.SELECT, lang });

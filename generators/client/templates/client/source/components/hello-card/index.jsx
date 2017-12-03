<% if (isFlow) { %>// @flow<% } %>
import React, { Component } from 'react';
<% if (isFlow) { %>
import { Card, CardText } from 'material-ui/Card/index';
import type { User } from '../../common/user';
<% } else  { %>
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui/Card';<% }
if (isFlow) { %>
type Props = {
  authentication: {
    user: User,
  },
};
<% } %>
class HelloCard extends Component<% if (isFlow) { %><Props><% } %> {
  <% if (isFlow) { %>props: Props;<% } %>
  render() {
    const {
      authentication: { user = { roles: [], firstName: '' } },
    } = this.props;
    return (
      <div className="box">
        <Card>
          <CardText>
            <h1>Hello {user.firstName}</h1>
            <h2>Your roles: {user.roles && user.roles.map(role => role.name).join(', ')}</h2>
          </CardText>
        </Card>
      </div>
    );
  }
}<% if (!isFlow) { %>

HelloCard.propTypes = {
  authentication: PropTypes.shape({
    user: PropTypes.shape({
      firstName: PropTypes.string,
      roles: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        }),
      ),
    }),
  }),
};
<% } %>
export default HelloCard;

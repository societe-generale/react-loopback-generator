import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui/Card';

class HelloCard extends Component {
  render() {
    const { authentication: { user = { roles: [] } } } = this.props;
    return (
      <div className="box">
        <Card>
          <CardText>
            <h1>Hello {user.firstName}</h1>
            <h2>Your roles: {user.roles.map(role => role.name).join(', ')}</h2>
          </CardText>
        </Card>
      </div>);
  }
}

HelloCard.propTypes = {
  authentication: PropTypes.shape({
    user: PropTypes.shape({
      firstName: PropTypes.string,
      roles: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
      }),
      ),
    }),
  }),
};

export default HelloCard;

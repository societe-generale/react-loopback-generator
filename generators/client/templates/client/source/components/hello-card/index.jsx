import React, { PropTypes } from 'react';
import { Card, CardText } from 'material-ui/Card';

const HelloCard = props => (
  <div className="box">
    <Card>
      <CardText>
        <h1>Hello {props.user.firstName}</h1>
        <h2>Your roles: {props.user.roles.map(role => role.name).join(', ')}</h2>
      </CardText>
    </Card>
  </div>);

HelloCard.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    roles: PropTypes.array,
  }),
};

export default HelloCard;

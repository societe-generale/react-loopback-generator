import React from 'react';
import { Card, CardText } from 'material-ui/Card';

export default props => (
  <div className="box">
    <Card>
      <CardText>
        <h1>Hello {props.user.firstName}</h1>
      </CardText>
    </Card>
  </div>
);

import React, { Component, PropTypes } from 'react';
import { Card, CardText } from 'material-ui/Card';

export default class HelloCard extends Component {
  render() {
    return (
      <div className="box">
        <Card>
          <CardText>
            <h1>Hello {this.props.user.firstName}</h1>
          </CardText>
        </Card>
      </div>
    );
  }
}

HelloCard.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
  }),
};

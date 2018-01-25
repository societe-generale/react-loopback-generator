// @flow
import React, { Component } from 'react';
import { Card, CardText } from 'material-ui/Card/index';
import type { User } from '../../common/user';

type Props = {
  authentication: {
    user: User,
  },
};

class HelloCard extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.user = props.authentication.user;
  }
  user: User;
  render() {
    return (
      <div className="box">
        <Card>
          <CardText>
            <h1>Hello {this.user.firstName}</h1>
            {this.user.roles && (
              <h2>
                Your roles: {this.user.roles.map(role => role.name).join(', ')}
              </h2>
            )}
          </CardText>
        </Card>
      </div>
    );
  }
}

export default HelloCard;

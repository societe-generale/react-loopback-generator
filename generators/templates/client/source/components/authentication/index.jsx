import React, {Component, PropTypes} from 'react'

import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Translate from 'react-translate-component';
import validator from 'validator';

class Authentication extends Component {

  isFormValid() {
    return this.props.credentials &&
      this.props.credentials.email &&
      validator.isEmail(this.props.credentials.email) &&
      this.props.credentials.password &&
      validator.isLength(this.props.credentials.password, {min: 6});
  }

  onFormChange(field, value) {
    this.props.onChange(Object.assign({}, this.props.credentials, {[field]: value}));
  }

  render() {
    return (
      <div className="box">
        <Card>
          <CardTitle
            title={
              <Translate content="authentication.title" />
            } />
          <CardText>
            <div className="row">
              <div className="col-xs-12">
                <TextField
                  floatingLabelText={
                    <Translate content="account.email" />
                  }
                  fullWidth={true}
                  onChange={e => this.onFormChange('email', e.target.value)}
                  type="email"
                  value={this.props.credentials.email || ''} />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <TextField
                  floatingLabelText={
                    <Translate content="account.password" />
                  }
                  fullWidth={true}
                  onChange={e => this.onFormChange('password', e.target.value)}
                  type="password"
                  value={this.props.credentials.password || ''} />
              </div>
            </div>
          </CardText>
          <CardActions>
            <div className="row center-xs">
              <div className="col-xs-6">
                <RaisedButton
                  disabled={!this.isFormValid()}
                  label={<Translate content="authentication.login.button" />}
                  onTouchTap={this.props.onLogin}
                  primary={true} />
              </div>
              <div className="col-xs-6">
                <RaisedButton
                  disabled={!this.isFormValid()}
                  label={<Translate content="authentication.register.button" />}
                  onTouchTap={this.props.onRegister} />
              </div>
            </div>
          </CardActions>
        </Card>
      </div>
    );
  }
}

Authentication.propTypes = {
  credentials: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};

export default Authentication;

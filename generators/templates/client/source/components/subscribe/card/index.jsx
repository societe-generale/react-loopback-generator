import React, {Component, PropTypes} from 'react';
import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Translate from 'react-translate-component';
import validator from 'validator';

class SubscribeCard extends Component {

  isFormValid() {
    return this.props.subscription &&
      this.props.subscription.email &&
      validator.isEmail(this.props.subscription.email);
  }

  onFormChange(field, value) {
    this.props.onChange(Object.assign({}, this.props.subscription, {[field]: value}));
  }

  render() {
    return (
      <div className="box">
        <Card>
          <CardTitle
            title={<Translate content="subscribe.title" />}
            subtitle={<Translate content="subscribe.subtitle" />} />
          <CardText>
            <div className="row">
              <div className="col-xs-12">
                <TextField
                  floatingLabelText={
                    <Translate content="subscribe.email" />
                  }
                  fullWidth={true}
                  onChange={e => this.onFormChange('email', e.target.value)}
                  type="email"
                  value={this.props.subscription.email || ''} />
              </div>
            </div>
          </CardText>
          <CardActions>
            <div className="row center-xs">
              <div className="col-xs-6">
                <RaisedButton
                  disabled={!this.isFormValid()}
                  label={<Translate content="subscribe.button" />}
                  onTouchTap={this.props.onSubscribe}
                  primary={true} />
              </div>
            </div>
          </CardActions>
        </Card>
      </div>
    );
  }

}

export default SubscribeCard;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { findKey } from 'lodash';

import IconButton from 'material-ui/IconButton';
import ActionList from 'material-ui/svg-icons/action/list';

import ModelForm from '../../../../components/crud-view/model-form';

import styles from './styles.css';

import model from '../../../../../../server/models/<%= modelName %>.json';
import modelActions from '../../../../actions/models/<%= modelName %>';

const modelKeyId = findKey(
  model.properties,
  property => property.id === 'true',
);

export class CreateView extends Component {
  submitModelCreate = values => {
    this.props.createNewEntry(values);
  };

  returnToList = () => {
    this.props.navigateTo('/<%= modelName %>/list');
  };

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div className={styles.container}>
        <div className={styles.headerTitle}>
          <IconButton
            tooltip={formatMessage({ id: 'create.view.back-to-list' })}
            onClick={this.returnToList}
          >
            <ActionList />
          </IconButton>
          <h2>
            {`${formatMessage({ id: 'create.view.title' })} ${model.name}`}
          </h2>
        </div>
        <div>
          <ModelForm
            modelProperties={model.properties}
            onSubmit={this.submitModelCreate}
            modelKeyId={modelKeyId}
            disableModelKeyId={false}
          />
        </div>
      </div>
    );
  }
}

CreateView.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  navigateTo: PropTypes.func.isRequired,
  createNewEntry: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authentication: state.authentication,
});

const mapDispatchToProps = dispatch => ({
  navigateTo: path => {
    dispatch(push(path));
  },
  createNewEntry: formValues => {
    dispatch(modelActions.create(formValues));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  injectIntl(CreateView),
);


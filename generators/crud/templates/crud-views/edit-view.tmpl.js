import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import IconButton from 'material-ui/IconButton';
import ActionList from 'material-ui/svg-icons/action/list';

import ModelForm from '../../../../components/crud-view/model-form/';

import styles from './styles.css';

import model from '../../../../../../server/models/<%= modelName %>.json';
import modelActions from '../../../../actions/models/<%= modelName %>';

export class EditView extends Component {

  componentWillMount() {
    const id = this.props.params.id;
    this.props.findEntry(id);
  }

  submitModelEdit = (values) => {
    this.props.editEntry(values, parseInt(this.props.params.id, 10));
  }

  returnToList = () => {
    this.props.navigateTo('/<%= modelName %>/list');
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div className={styles.container}>
        <div className={styles.headerTitle}>
          <IconButton
            tooltip={formatMessage({ id: 'edit.view.back-to-list' })}
            onClick={this.returnToList}
          >
            <ActionList />
          </IconButton>
          <h2>
            {`${formatMessage({ id: 'edit.view.title' })} ${model.name}`}
          </h2>
        </div>
        <div>
          <ModelForm
            modelProperties={model.properties}
            onSubmit={this.submitModelEdit}
          />
        </div>
      </div>
    );
  }
}

EditView.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  navigateTo: PropTypes.func.isRequired,
  editEntry: PropTypes.func.isRequired,
  findEntry: PropTypes.func.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  authentication: state.authentication,
});

const mapDispatchToProps = dispatch => (
  {
    navigateTo: (path) => { dispatch(push(path)); },
    editEntry: (formValues, id) => { dispatch(modelActions.edit(formValues, id)); },
    findEntry: (id) => { dispatch(modelActions.findOne(id)); },
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(EditView));

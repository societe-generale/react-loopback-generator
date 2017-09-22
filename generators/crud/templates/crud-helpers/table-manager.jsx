import React, { Component, PropTypes } from 'react';

import { injectIntl } from 'react-intl';

import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import style from './table-manager.css';

export class TableManager extends Component {
  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div className={style.tableManagerWrapper}>
        <h2>
          {`${formatMessage({ id: 'list.table-manager.title' })} ${this.props.modelBasePath}`}
        </h2>
        <RaisedButton
          label="Create"
          labelPosition="after"
          primary={true}
          icon={<ContentAdd />}
          style={{ float: 'right' }}
          onClick={() => { this.props.navigateTo(`${this.props.modelBasePath}/create`); }}
        />
      </div>
    );
  }
}

TableManager.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  modelBasePath: PropTypes.string,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};

export default injectIntl(TableManager);

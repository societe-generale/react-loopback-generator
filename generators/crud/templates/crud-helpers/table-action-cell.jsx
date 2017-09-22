import React from 'react';
import PropTypes from 'prop-types';

import IconButton from 'material-ui/IconButton';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';

const inlineStyles = {
  iconButtonStyle: {
    width: '20px',
    height: '20px',
    padding: '0px',
    marginRight: '12px',
  },
  iconStyle: {
    width: '20px',
    height: '20px',
    padding: '0px',
  },
};

export const TableActionCell = ({ row, navigateTo, modelBasePath, deleteElement }) => (
  <div>
    <IconButton
      onClick={() => { navigateTo(`${modelBasePath}/edit/${row.value}`); }}
      style={inlineStyles.iconButtonStyle}
      iconStyle={inlineStyles.iconStyle}
    >
      <EditorModeEdit />
    </IconButton>
    <IconButton
      onClick={() => { deleteElement(row.value); }}
      style={inlineStyles.iconButtonStyle}
      iconStyle={inlineStyles.iconStyle}
    >
      <ActionDelete />
    </IconButton>
  </div>
);

export default TableActionCell;

TableActionCell.propTypes = {
  row: PropTypes.shape({
    value: PropTypes.number.isRequired,
  }).isRequired,
  navigateTo: PropTypes.func.isRequired,
  deleteElement: PropTypes.func.isRequired,
  modelBasePath: PropTypes.string,
};

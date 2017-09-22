import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import IconButton from 'material-ui/IconButton';

import TableActionCell from './table-action-cell';

describe('[Component] TableActionCell', () => {
  const defaultProps = {
    row: {
      value: 2,
    },
    navigateTo: () => {},
    deleteElement: () => {},
    modelBasePath: 'ae-data',
  };

  const setup = (propsOverride) => {
    const finalProps = Object.assign(defaultProps, propsOverride);
    const shallowWrapper = shallow(<TableActionCell {...finalProps} />);
    const editButton = shallowWrapper.find(IconButton).first();
    const deleteButton = shallowWrapper.find(IconButton).last();

    return {
      shallowWrapper,
      editButton,
      deleteButton,
    };
  };

  it('should exist', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper.exists()).to.be.true; // eslint-disable-line
  });

  describe('[UI]', () => {
    it('should render an icon button to edit', () => {
      const { editButton } = setup();
      expect(editButton.exists()).to.be.true; // eslint-disable-line
    });

    it('should render an icon button to delete', () => {
      const { deleteButton } = setup();
      expect(deleteButton.exists()).to.be.true; // eslint-disable-line
    });
  });

  describe('[Event]', () => {
    it('should navigate to the edit route of a given model when the edit button is clicked', () => {
      const routeSpy = sinon.spy();
      const { editButton } = setup({
        navigateTo: routeSpy,
        row: {
          value: 4,
        },
        modelBasePath: 'ae-data',
      });

      editButton.simulate('click');
      expect(routeSpy.calledWith('ae-data/edit/4')).to.be.true; // eslint-disable-line
    });

    it('should call the deleteElement prop when the delete button is clicked', () => {
      const deleteSpy = sinon.spy();
      const { deleteButton } = setup({
        deleteElement: deleteSpy,
        row: {
          value: 4,
        },
        modelBasePath: 'ae-data',
      });

      deleteButton.simulate('click');
      expect(deleteSpy.calledWith(4)).to.be.true; // eslint-disable-line
    });
  });
});

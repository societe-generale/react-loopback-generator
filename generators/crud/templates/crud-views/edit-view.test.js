import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import IconButton from 'material-ui/IconButton';

import { EditView } from './index';
import ModelForm from '../../../../components/crud-view/model-form';

describe('[Component] EditView', () => {
  const defaultProps = {
    intl: {
      formatMessage: obj => obj.id,
    },
    navigateTo: () => {},
    editEntry: () => {},
    findEntry: () => {},
    params: {
      id: '1',
    },
  };

  const setup = propsOverride => {
    const finalProps = Object.assign(defaultProps, propsOverride);
    const shallowWrapper = shallow(<EditView {...finalProps} />);
    return {
      shallowWrapper,
    };
  };

  it('should exist', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper.exists()).to.be.true; // eslint-disable-line
  });

  describe('[UI]', () => {
    it('should render a return to model list button', () => {
      const { shallowWrapper } = setup();
      expect(shallowWrapper.find(IconButton).length).to.equal(1);
    });

    it('should render a h2 tag as a bloc title', () => {
      const { shallowWrapper } = setup();
      expect(shallowWrapper.find('h2').length).to.equal(1);
    });

    it('should render a ModelForm component', () => {
      const { shallowWrapper } = setup();
      expect(shallowWrapper.find(ModelForm).length).to.equal(1);
    });
  });

  describe('[Event]', () => {
    it('should navigate to the list route of a given model when the return button is clicked', () => {
      const routeSpy = sinon.spy();
      const { shallowWrapper } = setup({
        navigateTo: routeSpy,
      });

      shallowWrapper.find(IconButton).simulate('click');
      expect(routeSpy.calledWith('/ae-data/list')).to.be.true; // eslint-disable-line
    });

    it('should call the findEntry prop when the component mounts', () => {
      const findEntrySpy = sinon.spy();
      setup({
        findEntry: findEntrySpy,
        params: {
          id: '4',
        },
      });

      expect(findEntrySpy.calledWith('4')).to.be.true; // eslint-disable-line
    });
  });
});

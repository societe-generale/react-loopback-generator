import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import IconButton from 'material-ui/IconButton';

import { CreateView } from './index';
import ModelForm from '../../../../components/crud-view/model-form';

describe('[Component] CreateView', () => {
  const defaultProps = {
    navigateTo: () => {},
    intl: {
      formatMessage: obj => obj.id,
    },
  };

  const setup = propsOverride => {
    const finalProps = Object.assign(defaultProps, propsOverride);
    const shallowWrapper = shallow(<CreateView {...finalProps} />);
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
      expect(routeSpy.calledWith('/<%= modelName %>/list')).to.be.true; // eslint-disable-line
    });
  });
});


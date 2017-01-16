import React from 'react';

import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
let sinon = require('sinon');
import moment from 'moment';
import locus from 'locus';

import Application from '../lib/components/Application';

describe('Application', () => {

  it('renders as a <div>', () => {
    const wrapper = shallow(<Application />);
    assert.equal(wrapper.type(), 'div');
  });

  // it('calls componentDidMount', () => {
  //   sinon.spy(Application.prototype, 'componentDidMount');
  //       const wrapper = mount(<Application />);
  //       expect(Application.prototype.componentDidMount.calledOnce).to.equal(true);
  // });

});

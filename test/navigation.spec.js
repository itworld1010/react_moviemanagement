import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
import Mock from './helpers/Mock'
import User from './helpers/user'

import Navigation from '../lib/components/Navigation';

describe('Navigation', () => {

  it('renders as a <div>', () => {
    const wrapper = shallow(<Navigation user={User}/>);
    assert.equal(wrapper.type(), 'div');
  });

});

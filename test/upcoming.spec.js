import React from 'react';

import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
let sinon = require('sinon');
import moment from 'moment';
import locus from 'locus';

import Upcoming from '../lib/components/Upcoming';

describe('Upcoming page', () => {

  it('renders as a <div>', () => {
    const wrapper = shallow(<Upcoming />);
    assert.equal(wrapper.type(), 'div');
  });

});

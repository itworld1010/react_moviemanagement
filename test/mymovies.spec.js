import React from 'react';

import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
let sinon = require('sinon');
import moment from 'moment';
import locus from 'locus';
import Mock from './helpers/Mock'

import MyMovies from '../lib/components/MyMovies';

describe('My Movies', () => {

  it('renders as a <div>', () => {
    const wrapper = shallow(<MyMovies />);
    assert.equal(wrapper.type(), 'div');
  });

//   it('renders individual movies', () => {
//  const wrapper = mount(<MyMovies movieDisplay={Mock}/>)
//  assert.equal(wrapper.find('.my-movie-card-container').length,17)
// })

});

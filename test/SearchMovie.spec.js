import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
import Mock from './helpers/Mock'

import SearchMovie from '../lib/components/SearchMovie';

describe('Seach Movie', () => {

  it('renders as a <div>', () => {
    const wrapper = shallow(<SearchMovie />);
    assert.equal(wrapper.type(), 'div');
  });

  it.skip('calls retrieveMovieSearch on click of Submit', () => {
  // Render a checkbox with label in the document
  const wrapper = shallow(
    <SearchMovie  />
  );
  expect(checkbox.text()).toEqual('Off');
  checkbox.find('input').simulate('change');
  expect(checkbox.text()).toEqual('On');
  });


});

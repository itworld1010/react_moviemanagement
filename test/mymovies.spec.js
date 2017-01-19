import React from 'react';

import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
let sinon = require('sinon');
import moment from 'moment';
import locus from 'locus';
import Mock from './helpers/Mock'

import MyMovies from '../lib/components/MyMovies';
import User from './helpers/user'
import FilterByFormat from '../lib/components/MyMovieFilters/FilterByFormat';
import FilterByGenre from '../lib/components/MyMovieFilters/FilterByGenre';
import FilterByRating from '../lib/components/MyMovieFilters/FilterByRating';
import PersonalMovieCard from '../lib/components/PersonalMovieCard';

describe('My Movies', () => {

  it('renders as a <div>', () => {
    const wrapper = shallow(<MyMovies user={User} />);
    assert.equal(wrapper.type(), 'div');
  });

  it('has a filter by format component', () => {
    const wrapper = shallow(<MyMovies user={User} />)
    expect(wrapper.find(FilterByFormat)).to.have.length(1)
  })

  it('has a filter by genre component', () => {
    const wrapper = shallow(<MyMovies user={User} />)
    expect(wrapper.find(FilterByGenre)).to.have.length(1)
  })

  it('has a filter by rating component', () => {
    const wrapper = shallow(<MyMovies user={User} />)
    expect(wrapper.find(FilterByRating)).to.have.length(1)
  })

  it.skip('has a PersonalMovieCard component', () => {
    const wrapper = shallow(<MyMovies user={User} movies={Mock}/>)
    expect(wrapper.find(PersonalMovieCard)).to.have.length(1)
  })

});

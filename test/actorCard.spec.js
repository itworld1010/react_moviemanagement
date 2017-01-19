import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
import User from './helpers/user';
import Mock from './helpers/Mock';

import ActorCard from '../lib/components/ActorCard';

describe('Actor Card', () => {

  it.skip('renders as an <article>', () => {
    const profile_path = '/y77GWClciGhZ4v0TwOFmNSM5CpI.jpg'
    const wrapper = shallow(<ActorCard profile_path={profile_path} user={User}/>);
    assert.equal(wrapper.type(), 'article');
  });

  // {this.props.cast.map((m, i) =>
  // <ActorCard cast={m} key={m.id} />
  // )}

});

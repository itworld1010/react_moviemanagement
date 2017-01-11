import React, { Component } from 'react'
import firebase, { usersFromDatabase, signIn, signOut } from '../firebase';
import { pick, split, map } from 'lodash';
import SearchMovie from './SearchMovie'
import Navigation from './Navigation'
import Upcoming from './Upcoming'
import logo from '../images/reel.png'


export default class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      movieResults: []
    }
  }

  componentWillMount() {
    let user = this.props.user
    this.setState({ user })
  }


  render() {
    return (
      <div className="Homepage">
        <div>
          <Upcoming user={this.state.user}/>
        </div>
      </div>
    )
  }
}

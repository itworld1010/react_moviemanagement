import React, { Component } from 'react'
import firebase, { usersFromDatabase, signIn, signOut } from '../firebase';
import { pick, split, map } from 'lodash';
import SearchMovie from './SearchMovie'
import Navigation from './Navigation'
// import MyMovies from './MyMovies'
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
        <div className="homepage-header">
          <img src={logo} className="logo" alt="logo" />
          <h2>Welcome to MovieKeeper</h2>
        </div>
      </div>
    )
  }
}

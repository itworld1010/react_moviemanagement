import React, { Component } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router'
import { signIn, signOut } from '../firebase'
import { split } from 'lodash';

import SearchMovie from './SearchMovie';
import Upcoming from './Upcoming';
import MyMovies from './MyMovies';
import NotFound from './NotFound';
import Navigation from './Navigation';
import Login from './Login';
import firebase from '../firebase';

export default class Application extends Component{
  constructor(){
    super()
    this.state = {
      user: null,
      movieResults: [],
      showMenu: false
    }
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
  }

  toggleMobileMenu() {
    this.setState({ showMenu: !this.state.showMenu})
  }

  render() {
    let { user } = this.state
    let currentUser;
    let firstName;
    if (user !== null) {
      currentUser = user.displayName
      firstName = split(user.displayName, ' ')
    }

    return(
      <BrowserRouter>
        <div>
          { this.state.user ?
            <div>
              <Navigation
                user={this.state.user}
                showMenu={this.state.showMenu}
                toggleMobileMenu={this.toggleMobileMenu.bind(this)}
              />
              <Match exactly pattern="/" render={() => <MyMovies user={this.state.user}/>}/>
              <Match exactly pattern="/explore" render={() => <Upcoming user={this.state.user}/>} />
              <Match exactly pattern="/search" render={() => <SearchMovie user={this.state.user}/>} />
              <Miss component={NotFound} />
            </div>
          :
            <Login />
          }
        </div>
      </BrowserRouter>
    )
  }
}

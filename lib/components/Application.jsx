import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
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
      <Router>
        <div>
          { this.state.user ?
            <div>
              <Navigation
                user={this.state.user}
                showMenu={this.state.showMenu}
                toggleMobileMenu={this.toggleMobileMenu.bind(this)}
              />
              <Route exact path="/" render={() => <MyMovies user={this.state.user}/>}/>
              <Route exact path="/explore" render={() => <Upcoming user={this.state.user}/>} />
              <Route exact path="/search" render={() => <SearchMovie user={this.state.user}/>} />
              {/* <Miss component={NotFound} /> */}
            </div>
          :
            <Login />
          }
        </div>
      </Router>
    )
  }
}

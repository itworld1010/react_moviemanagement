import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router'

import Homepage from './Homepage';
import SearchMovie from './SearchMovie';
import MovieCard from './MovieCard';
import MyMovies from './MyMovies';
import SignIn from './SignIn';
import NotFound from './NotFound';
import Navigation from './Navigation';
import firebase from '../firebase';

class Application extends Component{
  constructor(){
    super()
    this.state = {
      user: null,
      movieResults: []
    }
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
  }

  render() {
    return(
      <BrowserRouter>
      <div>
        <Navigation user={this.state.user}/>
        <Match exactly pattern="/" render={() => <Homepage user={this.state.user}/>}/>
        <Match exactly pattern="/search" render={() => <SearchMovie user={this.state.user}/>} />
        <Match exactly pattern="/mymovies" render={() => <MyMovies user={this.state.user}/>} />
        {/* <Match exactly pattern="/" component={MovieCard} user={this.state.user}/> */}
        {/* <Match exactly pattern="/" component={MyMovies} /> */}
        {/* <Match exactly pattern="/" component={App} />
        <Match exactly pattern="/about" component={About} />
        <Match exactly pattern="/contact" component={Contact} />*/}
        <Miss component={NotFound} />
      </div>
      </BrowserRouter>
    )
  }
}




render(<Application />, document.querySelector("#application"))
